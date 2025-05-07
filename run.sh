#!/bin/bash

echo ">> Pokrećem ShadowFox..."

# Pokreni backend
echo "[+] Backend startuje..."
cd backend
uvicorn main:app --reload &
BACK_PID=$!
cd ..

# Pokreni frontend
echo "[+] Frontend startuje..."
cd frontend
npm run dev &
FRONT_PID=$!
cd ..

# Čekaj da korisnik prekine
trap "kill $BACK_PID $FRONT_PID" EXIT
wait
