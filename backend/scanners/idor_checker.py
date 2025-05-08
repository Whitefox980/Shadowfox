import requests
def scan(target):
    return {
        "target": target,
        "test": "idor_checker",
        "result": "IDOR test simulacija.",
        "payload": "user_id=1 → user_id=2",
        "notes": "IDOR test izvršen"
    }
def idor_checker(target):
    base_url = target.split("?")[0]
    results = []

    for i in range(1, 6):
        try:
            response = requests.get(f"{base_url}?id={i}", timeout=5)
            if "username" in response.text.lower() or "email" in response.text.lower():
                results.append(f"ID {i}: Visible sensitive data")
        except Exception as e:
            return f"Greška: {str(e)}"

    return " | ".join(results) if results else "Clean"
