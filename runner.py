# runner.py

import subprocess
import json
import os

CONFIG_PATH = "config/scanners.json"
POC_PATH = "poc_scripts"
TARGETS_PATH = "targets/targets.txt"

def load_targets():
    with open(TARGETS_PATH, "r") as f:
        return [line.strip() for line in f if line.strip()]

def load_enabled_scanners():
    if not os.path.exists(CONFIG_PATH):
        return []
    with open(CONFIG_PATH) as f:
        data = json.load(f)
        return data.get("active", [])

def run_scanner(script, target):
    script_path = os.path.join(POC_PATH, script)
    if not os.path.isfile(script_path):
        print(f"[!] Script not found: {script_path}")
        return
    print(f"[+] Pokrećem {script} na {target}")
    try:
        result = subprocess.run(["python", script_path, target], capture_output=True, text=True)
        print(result.stdout)
    except Exception as e:
        print(f"[!] Greška: {e}")

def main():
    targets = load_targets()
    scanners = load_enabled_scanners()
    for target in targets:
        for scanner in scanners:
            run_scanner(scanner, target)

if __name__ == "__main__":
    main()
