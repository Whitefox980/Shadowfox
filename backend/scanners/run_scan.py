from backend.scanners.command_injection import command_injection
from backend.scanners.idor_checker import idor_checker
from backend.scanners.lfi_scanner import lfi_scanner
from backend.poc_store import save_poc
from backend.scanners.xss_poc import xss_poc
from backend.scanners.sql_injection import sql_injector

def run_full_scan(targets, tests):
    results = []
    for target in targets:
        for test in tests:
            if test == "xss_poc":
                result = xss_poc(target)
                payload = "<script>alert(1)</script>"

            elif test == "sql_injection":
                result = sql_injector(target)
                payload = "1 OR 1=1"
            elif test == "lfi_scanner":
                result = lfi_scanner(target)
                payload = "../../etc/passwd"
            elif test == "idor_checker":
                result = idor_checker(target)
                payload = "id=1..5"
            elif test == "command_injection":
                result = command_injection(target)
                payload = ";cat /etc/passwd"
            else:
                result = f"Test {test} nije još implementiran"
                payload = "N/A"

            save_poc({
                "target": target,
                "vuln": test,
                "payload": payload,
                "result": result
            })
            results.append((target, test, result))

    return results
