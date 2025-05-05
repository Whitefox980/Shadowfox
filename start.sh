#!/data/data/com.termux/files/usr/bin/bash

echo "=== BugHunt AI Početak ==="
cd "$(dirname "$0")"

# Kreira log folder ako ne postoji
mkdir -p data/logs

# Pokreće glavni Python fajl
python main.py
