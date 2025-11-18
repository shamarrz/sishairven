#!/bin/bash
# Copy WEBP images to static directory

mkdir -p static
cp /home/ajebo/hair.WEBP static/ 2>/dev/null || echo "hair.WEBP not found"
cp /home/ajebo/nails.WEBP static/ 2>/dev/null || echo "nails.WEBP not found"
cp /home/ajebo/skincare.WEBP static/ 2>/dev/null || echo "skincare.WEBP not found"
cp /home/ajebo/events.WEBP static/ 2>/dev/null || echo "events.WEBP not found"

echo "Images copied to static directory"

