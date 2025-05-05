import requests
from utils.log_utils import log_to_sheet

def load_targets(file_path):
    with open(file_path, "r") as f:
        return [line.strip() for line in f if line.strip()]

def discover_methods(url):
    try:
        response = requests.options(url, timeout=5)
        allowed = response.headers.get("Allow", "N/A")
        print(f"[+] {url} dozvoljene metode: {allowed}")
        return f"Metode: {allowed}"
    except Exception as e:
        print(f"[-] Greška za {url}: {e}")
        return f"Greška: {e}"

def run():
    targets = load_targets("targets/targets.txt")
    for url in targets:
        print(f"[•] Testiram: {url}")
        rezultat = discover_methods(url)
        log_to_sheet(__file__, rezultat)

if __name__ == "__main__":
    run()
