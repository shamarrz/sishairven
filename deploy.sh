#!/bin/bash
# Deployment script for Hairven Salon Website

set -e

echo "🚀 Hairven by Elyn - Deployment Script"
echo "======================================"
echo ""

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker compose down 2>/dev/null || true
echo "✅ Containers stopped"
echo ""

# Build the Docker image
echo "🔨 Building Docker image..."
docker compose build --no-cache
echo "✅ Build complete"
echo ""

# Start the containers
echo "🚀 Starting containers..."
docker compose up -d
echo "✅ Containers started"
echo ""

# Wait a moment for containers to start
sleep 3

# Check container status
echo "📊 Container status:"
docker compose ps
echo ""

# Show logs
echo "📋 Recent logs (press Ctrl+C to exit):"
echo "--------------------------------------"
docker compose logs --tail=20
echo ""
echo "To view live logs: docker compose logs -f"
echo ""

# Check if service is responding
echo "🔍 Checking service health..."
sleep 2

if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Service is responding at http://localhost:8080"
else
    echo "⚠️  Service may still be starting. Check logs with: docker compose logs -f"
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Access the website at: http://localhost:8080"
echo "View logs: docker compose logs -f"
echo "Stop service: docker compose down"
echo ""

