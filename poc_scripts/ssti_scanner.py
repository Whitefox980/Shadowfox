import requests
from utils.log_utils import log_to_sheet, classify_severity

SSTI_PAYLOAD = "{{7*7}}"
SSTI_EVAL = "49"

def load_targets(file_path):
    with open(file_path, "r") as f:
        return [line.strip() for line in f if line.strip()]

def run_ssti_scan():
    targets = load_targets("targets/targets.txt")
    for base_url in targets:
        test_url = f"{base_url}?input={SSTI_PAYLOAD}"
        try:
            r = requests.get(test_url, timeout=5)
            if SSTI_EVAL in r.text:
                log = f"[+] SSTI detektovan: {test_url}"
                print(log)
                severity = classify_severity(log)
                log_to_sheet(__file__, log) 
            else:
                print(f"[-] Nema SSTI: {test_url}")
        except:
            continue

if __name__ == "__main__":
    run_ssti_scan()
