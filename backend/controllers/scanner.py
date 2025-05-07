from fastapi import APIRouter, Request
import subprocess
import os
from ..utils.log_utils import log_event
router = APIRouter()

TEST_MAP = {
    "xss_scanner": "xss_scanner.py",
    "ssrf_tester": "ssrf_tester.py",
    "idor_tester": "idor_tester.py",
    "sqli_scanner": "sqli_scanner.py",
    "lfi_scanner": "lfi_scanner.py",
    "open_redirect": "open_redirect.py",
    "subdomain_enum": "subdomain_enum.py"
}

@router.post("/run-selected")
async def run_selected(request: Request):
    data = await request.json()
    selected_tests = data.get("tests", [])
    output = ""

    for test in selected_tests:
        script = TEST_MAP.get(test)
        if script:
            cmd = f"python3 -m poc_scripts.{script[:-3]}"
            try:
                result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
                output += f"\n[+] Rezultat za {script}:\n{result.stdout}\n"
            except Exception as e:
                output += f"\n[!] Greška za {script}: {e}\n"
    
    log_event("Pokrenuti testovi", ", ".join(selected_tests))
    return {"output": output.strip()}
