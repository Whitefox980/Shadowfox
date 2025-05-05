#!/bin/bash

echo "=== BugHunt pokretanje ==="
python runner.py
echo -e "\n[>] Pokrećem: open_redirect_poc.py"
python poc_scripts/open_redirect_poc.py
