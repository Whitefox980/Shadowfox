#!/data/data/com.termux/files/usr/bin/bash

# Pokreće backend u pozadini
cd ~/Shadowfox
echo "[+] Pokrećem backend..."
nohup uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000 > backend.log 2>&1 &

# Pokreće frontend
cd frontend
echo "[+] Pokrećem frontend..."
npm install
npm run dev -- --host
