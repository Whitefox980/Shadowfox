#!/data/data/com.termux/files/usr/bin/bash

echo "[*] Menjam axios putanje na http://127.0.0.1:8000"

find frontend -type f -name "*.jsx" | while read file; do
  sed -i 's|axios.get("/api|axios.get("http://127.0.0.1:8000/api|g' "$file"
  sed -i 's|axios.post("/api|axios.post("http://127.0.0.1:8000/api|g' "$file"
done

echo "[+] Gotovo."
