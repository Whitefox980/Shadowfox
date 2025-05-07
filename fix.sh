#!/data/data/com.termux/files/usr/bin/bash

echo "[*] Menjam axios putanje u src/pages..."

find src/pages -type f -name "*.jsx" -exec sed -i 's|import axios from "axios"|import axios from "../axios"|g' {} +

echo "[+] Gotovo."
