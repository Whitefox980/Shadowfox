# fajl: poc_scripts/idor_tester.py
import requests
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
from utils.log_utils import log_to_sheet, classify_severity

def generate_urls(base_url):
    parsed = urlparse(base_url)
    query = parse_qs(parsed.query)

    urls = []
    for key, values in query.items():
        for i in range(1, 6):
            query[key] = [str(i)]
            new_query = urlencode(query, doseq=True)
            new_url = urlunparse((parsed.scheme, parsed.netloc, parsed.path, '', new_query, ''))
            urls.append(new_url)
    return urls

def run_idor_test():
    print("[~] Pokrećem IDOR test...")
    with open("targets/targets.txt", "r") as f:
        targets = [line.strip() for line in f if line.strip() and not line.startswith("#")]

    for url in targets:
        print(f"[+] Analiziram: {url}")
        test_urls = generate_urls(url)
        for test_url in test_urls:
            r = requests.get(test_url)
            if "user" in r.text or "admin" in r.text or r.status_code == 200:
                print(f"[!] Mogući IDOR: {test_url}")
                severity = classify_severity(f"Mogući IDOR: {test_url}")
                log_to_sheet(__file__, f"Mogući IDOR: {test_url}") 

if __name__ == "__main__":
    run_idor_test()
