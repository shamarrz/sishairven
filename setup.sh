#!/bin/bash
# Setup script for Hairven Salon Website

set -e

echo "🎨 Hairven by Elyn - Setup Script"
echo "=================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found"
echo ""

# Check if Node.js is installed (for local dev)
if command -v node &> /dev/null; then
    echo "✅ Node.js found: $(node --version)"
    echo ""
    
    # Install dependencies if package.json exists
    if [ -f "package.json" ]; then
        echo "📦 Installing npm dependencies..."
        npm install
        echo "✅ Dependencies installed"
        echo ""
    fi
else
    echo "⚠️  Node.js not found (optional for Docker deployment)"
    echo ""
fi

# Check for background images
echo "🖼️  Checking for background images..."
if [ -d "static/bg" ] && [ "$(ls -A static/bg/*.webp 2>/dev/null | wc -l)" -gt 0 ]; then
    echo "✅ Background images found"
else
    echo "⚠️  Warning: Background images not found in static/bg/"
    echo "   Expected: bg1.webp, bg2.webp, bg3.webp, bg4.webp, bg5.webp"
fi
echo ""

# Check for service images
echo "🖼️  Checking for service images..."
required_images=("hair.WEBP" "nails.WEBP" "skincare.WEBP" "events.WEBP")
missing_images=()

for img in "${required_images[@]}"; do
    if [ ! -f "static/$img" ]; then
        missing_images+=("$img")
    fi
done

if [ ${#missing_images[@]} -eq 0 ]; then
    echo "✅ All service images found"
else
    echo "⚠️  Warning: Missing service images:"
    for img in "${missing_images[@]}"; do
        echo "   - static/$img"
    done
fi
echo ""

# Create data directory if it doesn't exist
if [ ! -d "data" ]; then
    echo "📁 Creating data directory..."
    mkdir -p data
    echo "✅ Data directory created"
    echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run './deploy.sh' to start the application"
echo "2. Or manually: docker compose up --build -d"
echo ""

