#!/bin/bash
# =============================================================================
# HAIRVEN PRODUCTION DEPLOYMENT SCRIPT
# =============================================================================
# Automates deployment to production server with health checks
# Usage: ./scripts/deploy.sh [environment]
# Environments: production (default), staging
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT="${1:-production}"
SERVER_IP="${SERVER_IP:-192.241.159.235}"
SERVER_USER="${SERVER_USER:-root}"
APP_NAME="hairven-salon"
DEPLOY_DIR="/opt/hairven"
BACKUP_DIR="/opt/backups/hairven"
DOCKER_COMPOSE_FILE="docker-compose.yml"
HEALTH_CHECK_URL="http://localhost:3000/healthz"
HEALTH_CHECK_TIMEOUT=60

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Header
log_info "🚀 Hairven by Elyn - Production Deployment"
log_info "============================================"
log_info "Environment: $ENVIRONMENT"
log_info "Server: $SERVER_IP"
log_info ""

# Pre-deployment checks
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
    
    # Check if .env file exists
    if [[ ! -f ".env" ]]; then
        if [[ -f ".env.production" ]]; then
            log_warning ".env file not found, copying from .env.production"
            cp .env.production .env
        else
            log_error ".env file not found and .env.production template missing"
            exit 1
        fi
    fi
    
    # Check required environment variables
    local required_vars=("PUBLIC_SITE_URL" "NODE_ENV")
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if ! grep -q "^${var}=" .env || grep -q "^${var}=$" .env; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        log_warning "Missing recommended environment variables: ${missing_vars[*]}"
    fi
    
    log_success "Prerequisites check passed"
}

# Build application
build_application() {
    log_info "Building application..."
    
    # Install dependencies
    npm ci --production=false
    
    # Build the application
    npm run build
    
    if [[ $? -ne 0 ]]; then
        log_error "Build failed"
        exit 1
    fi
    
    log_success "Build completed successfully"
}

# Create backup
create_backup() {
    log_info "Creating backup..."
    
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/backup_$timestamp"
    
    mkdir -p "$backup_path"
    
    # Backup database if exists
    if [[ -f "/data/appointments.db" ]]; then
        cp /data/appointments.db "$backup_path/"
        log_info "Database backed up"
    fi
    
    # Backup environment file
    if [[ -f ".env" ]]; then
        cp .env "$backup_path/"
        log_info "Environment file backed up"
    fi
    
    # Cleanup old backups (keep last 10)
    if [[ -d "$BACKUP_DIR" ]]; then
        ls -t "$BACKUP_DIR" | tail -n +11 | xargs -I {} rm -rf "$BACKUP_DIR/{}" 2>/dev/null || true
    fi
    
    log_success "Backup created at $backup_path"
}

# Deploy to server
deploy_to_server() {
    log_info "Deploying to server..."
    
    # Create deployment archive
    local deploy_archive="/tmp/hairven-deploy-$(date +%s).tar.gz"
    
    # Create archive excluding unnecessary files
    tar -czf "$deploy_archive" \
        --exclude='node_modules' \
        --exclude='.git' \
        --exclude='.svelte-kit' \
        --exclude='build' \
        --exclude='*.log' \
        --exclude='.env.local' \
        \
    log_info "Deployment archive created"
    
    # Create remote directories
    ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $DEPLOY_DIR $BACKUP_DIR"
    
    # Transfer files
    scp "$deploy_archive" "$SERVER_USER@$SERVER_IP:/tmp/"
    
    # Extract and deploy on remote server
    ssh "$SERVER_USER@$SERVER_IP" << EOF
        set -e
        
        # Extract archive
        cd $DEPLOY_DIR
        tar -xzf $deploy_archive --strip-components=1
        
        # Ensure data directory exists
        mkdir -p /data
        
        # Build and start containers
        if command -v docker-compose &> /dev/null; then
            docker-compose down --timeout 30 || true
            docker-compose build --no-cache
            docker-compose up -d
        else
            docker compose down --timeout 30 || true
            docker compose build --no-cache
            docker compose up -d
        fi
        
        # Cleanup
        rm -f $deploy_archive
EOF
    
    rm -f "$deploy_archive"
    
    log_success "Deployment completed on server"
}

# Health check
health_check() {
    log_info "Running health checks..."
    
    local retries=0
    local max_retries=30
    local wait_time=2
    
    while [[ $retries -lt $max_retries ]]; do
        if curl -sf "$HEALTH_CHECK_URL" > /dev/null 2>&1; then
            log_success "Health check passed"
            return 0
        fi
        
        retries=$((retries + 1))
        log_info "Health check attempt $retries/$max_retries failed, retrying in ${wait_time}s..."
        sleep $wait_time
    done
    
    log_error "Health check failed after $max_retries attempts"
    return 1
}

# Rollback on failure
rollback() {
    log_error "Deployment failed, initiating rollback..."
    
    # Get latest backup
    local latest_backup=$(ls -t "$BACKUP_DIR" 2>/dev/null | head -1)
    
    if [[ -n "$latest_backup" ]]; then
        log_info "Restoring from backup: $latest_backup"
        
        # Restore database
        if [[ -f "$BACKUP_DIR/$latest_backup/appointments.db" ]]; then
            cp "$BACKUP_DIR/$latest_backup/appointments.db" /data/
        fi
        
        # Restart previous version
        docker-compose restart
        
        log_warning "Rollback completed"
    else
        log_error "No backup found for rollback"
    fi
    
    exit 1
}

# Main deployment flow
main() {
    log_info "Starting deployment process..."
    
    # Set trap for rollback on error
    trap rollback ERR
    
    # Run deployment steps
    check_prerequisites
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        create_backup
    fi
    
    build_application
    
    # For local deployment
    if [[ "${LOCAL_DEPLOY:-false}" == "true" ]]; then
        log_info "Running local deployment..."
        
        # Stop existing containers
        docker-compose down --timeout 30 2>/dev/null || true
        
        # Build and start
        docker-compose build --no-cache
        docker-compose up -d
        
        # Health check
        sleep 5
        health_check
    else
        # Remote deployment
        deploy_to_server
        
        # Remote health check
        ssh "$SERVER_USER@$SERVER_IP" "curl -sf $HEALTH_CHECK_URL" || {
            log_error "Remote health check failed"
            exit 1
        }
    fi
    
    log_success "🎉 Deployment completed successfully!"
    log_info "Website: https://sishairven.com"
    log_info "Health: $HEALTH_CHECK_URL"
}

# Run main function
main "$@"
