#!/bin/bash

echo "=== Starting System Cleanup ==="

# --- APT CLEANUP ---
echo "Cleaning APT cache..."
sudo apt-get clean
sudo apt-get autoclean
sudo apt-get autoremove -y

# --- JOURNAL LOGS ---
echo "Cleaning journal logs..."
sudo journalctl --vacuum-time=3d

# --- THUMBNAILS ---
echo "Cleaning thumbnail cache..."
rm -rf ~/.cache/thumbnails/*

# --- SYS CACHE ---
echo "Cleaning system cache..."
sudo rm -rf /var/cache/*

# --- SNAP CLEANUP ---
echo "Cleaning Snap old versions..."
sudo snap set system refresh.retain=2
sudo rm -rf /var/lib/snapd/cache/*

# --- DOCKER CLEANUP ---
echo "Pruning Docker system..."
docker system prune -a --volumes -f
docker builder prune -a -f

# --- OLD KERNELS (keeps current one safe) ---
echo "Removing unused old kernels..."
sudo apt-get remove --purge $(dpkg -l 'linux-image-*' | grep '^rc' | awk '{print $2}') -y

echo "=== Cleanup Complete ==="
echo "Checking disk usage..."

df -h
