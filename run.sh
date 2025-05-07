#!/data/data/com.termux/files/usr/bin/bash

cd ~/Shadowfox
echo "Pokrećem ShadowFox API..."
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
