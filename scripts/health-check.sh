#!/bin/bash
# =============================================================================
# HAIRVEN HEALTH CHECK SCRIPT
# =============================================================================
# Verifies deployment health and system status
# Usage: ./scripts/health-check.sh [options]
# Options:
#   --detailed    Run detailed health check with metrics
#   --token TOKEN Use authentication token for detailed check
#   --watch       Continuous monitoring mode
#   --interval N  Check interval in seconds (default: 30)
# =============================================================================

set -euo pipefail

# Configuration
HEALTH_URL="${HEALTH_URL:-http://localhost:3000/healthz}"
DETAILED="${DETAILED:-false}"
TOKEN="${TOKEN:-}"
WATCH_MODE="${WATCH_MODE:-false}"
INTERVAL="${INTERVAL:-30}"
ALERT_THRESHOLD=3

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# State
consecutive_failures=0

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --detailed)
            DETAILED=true
            shift
            ;;
        --token)
            TOKEN="$2"
            shift 2
            ;;
        --watch)
            WATCH_MODE=true
            shift
            ;;
        --interval)
            INTERVAL="$2"
            shift 2
            ;;
        --url)
            HEALTH_URL="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --detailed          Run detailed health check"
            echo "  --token TOKEN       Authentication token"
            echo "  --watch             Continuous monitoring mode"
            echo "  --interval N        Check interval in seconds (default: 30)"
            echo "  --url URL           Health check endpoint URL"
            echo "  -h, --help          Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Check basic health
check_basic() {
    local response
    local status
    
    response=$(curl -sf -w "\n%{http_code}" "$HEALTH_URL" 2>/dev/null || echo -e "\n000")
    status=$(echo "$response" | tail -1)
    
    if [[ "$status" == "200" ]]; then
        echo -e "${GREEN}✓${NC} Health check passed (HTTP $status)"
        return 0
    else
        echo -e "${RED}✗${NC} Health check failed (HTTP ${status:-no response})"
        return 1
    fi
}

# Check detailed health
check_detailed() {
    local curl_opts="-sf"
    
    if [[ -n "$TOKEN" ]]; then
        curl_opts="$curl_opts -H \"Authorization: Bearer $TOKEN\""
    fi
    
    local response
    local status
    
    response=$(curl $curl_opts -w "\n%{http_code}" "${HEALTH_URL}?detailed=true" 2>/dev/null || echo '{"status":"error"}' && echo -e "\n000")
    status=$(echo "$response" | tail -1)
    body=$(echo "$response" | head -n -1)
    
    if [[ "$status" != "200" ]]; then
        echo -e "${RED}✗${NC} Health check failed (HTTP $status)"
        return 1
    fi
    
    # Parse JSON response
    local health_status
    health_status=$(echo "$body" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    
    case "$health_status" in
        healthy)
            echo -e "${GREEN}✓${NC} System is healthy"
            ;;
        degraded)
            echo -e "${YELLOW}⚠${NC} System is degraded"
            ;;
        unhealthy)
            echo -e "${RED}✗${NC} System is unhealthy"
            ;;
        *)
            echo -e "${YELLOW}?${NC} Unknown health status: $health_status"
            ;;
    esac
    
    # Display detailed metrics
    if command -v jq &> /dev/null; then
        echo ""
        echo "Detailed metrics:"
        echo "$body" | jq -r '
            "  Uptime: \(.uptime // "N/A")ms",
            "  Version: \(.version // "N/A")",
            "  Database: \(.checks.database // false | if . then "✓" else "✗" end)",
            "  Filesystem: \(.checks.filesystem // false | if . then "✓" else "✗" end)",
            "  Memory: \(.checks.memory.used // "N/A")MB / \(.checks.memory.total // "N/A")MB (\(.checks.memory.percentage // "N/A")%)"
        '
        
        # Display warnings if any
        local warnings
        warnings=$(echo "$body" | jq -r '.warnings // empty | .[]')
        if [[ -n "$warnings" ]]; then
            echo ""
            echo -e "${YELLOW}Warnings:${NC}"
            echo "$warnings" | sed 's/^/  - /'
        fi
    else
        echo ""
        echo "Response:"
        echo "$body"
    fi
    
    [[ "$health_status" == "healthy" ]]
}

# Check SSL certificate
check_ssl() {
    local domain
    domain=$(echo "$HEALTH_URL" | sed -E 's|https?://||' | cut -d'/' -f1 | cut -d':' -f1)
    
    # Skip if localhost or IP
    if [[ "$domain" =~ ^(localhost|127\.|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)$ ]]; then
        return 0
    fi
    
    if ! command -v openssl &> /dev/null; then
        return 0
    fi
    
    local cert_info
    cert_info=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -dates -subject)
    
    if [[ -z "$cert_info" ]]; then
        echo -e "${YELLOW}⚠${NC} Could not retrieve SSL certificate"
        return 1
    fi
    
    local expiry
    expiry=$(echo "$cert_info" | grep "notAfter=" | cut -d'=' -f2)
    
    if [[ -n "$expiry" ]]; then
        local expiry_epoch
        local now_epoch
        local days_until_expiry
        
        expiry_epoch=$(date -d "$expiry" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$expiry" +%s 2>/dev/null)
        now_epoch=$(date +%s)
        days_until_expiry=$(( (expiry_epoch - now_epoch) / 86400 ))
        
        if [[ $days_until_expiry -lt 7 ]]; then
            echo -e "${RED}✗${NC} SSL certificate expires in $days_until_expiry days"
            return 1
        elif [[ $days_until_expiry -lt 30 ]]; then
            echo -e "${YELLOW}⚠${NC} SSL certificate expires in $days_until_expiry days"
        else
            echo -e "${GREEN}✓${NC} SSL certificate valid for $days_until_expiry days"
        fi
    fi
}

# Check Docker containers
check_docker() {
    if ! command -v docker &> /dev/null; then
        return 0
    fi
    
    local containers
    containers=$(docker ps --filter "name=hairven" --format "{{.Names}}: {{.Status}}" 2>/dev/null || true)
    
    if [[ -z "$containers" ]]; then
        echo -e "${YELLOW}⚠${NC} No Hairven containers found"
        return 1
    fi
    
    echo -e "${GREEN}✓${NC} Docker containers running:"
    echo "$containers" | sed 's/^/  /'
}

# Single health check run
run_check() {
    echo "================================"
    log "Health Check - $HEALTH_URL"
    echo "================================"
    echo ""
    
    local all_passed=true
    
    # Basic health check
    if ! check_basic; then
        all_passed=false
    fi
    
    # Detailed check if requested
    if [[ "$DETAILED" == "true" ]]; then
        echo ""
        if ! check_detailed; then
            all_passed=false
        fi
    fi
    
    # Docker check
    echo ""
    check_docker || all_passed=false
    
    # SSL check (only for HTTPS)
    if [[ "$HEALTH_URL" == https://* ]]; then
        echo ""
        check_ssl || true
    fi
    
    echo ""
    echo "================================"
    
    if $all_passed; then
        echo -e "${GREEN}All checks passed ✓${NC}"
        consecutive_failures=0
        return 0
    else
        echo -e "${RED}Some checks failed ✗${NC}"
        ((consecutive_failures++))
        return 1
    fi
}

# Send alert (customize as needed)
send_alert() {
    local message="Hairven health check failed $consecutive_failures consecutive times"
    log "ALERT: $message"
    
    # Add your alerting mechanism here:
    # - Send email
    # - Send Slack notification
    # - Create PagerDuty incident
    # - etc.
}

# Watch mode
watch_mode() {
    log "Starting continuous monitoring (interval: ${INTERVAL}s)"
    echo ""
    
    while true; do
        run_check
        local status=$?
        
        # Send alert after threshold failures
        if [[ $consecutive_failures -ge $ALERT_THRESHOLD ]]; then
            send_alert
        fi
        
        echo ""
        sleep "$INTERVAL"
    done
}

# Main
main() {
    if [[ "$WATCH_MODE" == "true" ]]; then
        watch_mode
    else
        run_check
        exit $?
    fi
}

main "$@"
