from fastapi import APIRouter, Request
from backend.run_scan.core import run_full_scan, save_scan_result

router = APIRouter()

@router.post("/api/run-scan")
async def run_scan_api(request: Request):
    data = await request.json()
    targets = data.get("targets", [])
    tests = data.get("tests", [])
    
    if not targets or not tests:
        return {"error": "Nisu prosleđene mete ili testovi."}

    results = run_full_scan(targets, tests)
    for r in results:
        save_scan_result(r.get("target", ""), r.get("test", ""), r.get("result", ""))
    
    return {"message": "Skeniranje završeno", "results": results}
import time
from backend.poc_store import save_poc

def simulate_scan(target, test):
    # Ovo je samo primer, ti ovde povezuješ prave testere (npr. XSS, SQLi itd.)
    time.sleep(1)
    return f"Simuliran rezultat za {test} na {target}"

def run_full_scan(targets, tests):
    results = []
    for target in targets:
        for test in tests:
            result = simulate_scan(target, test)
            save_poc({
                "target": target,
                "vuln": test,
                "payload": "test_payload",
                "result": result
            })
            results.append((target, test, result))
    return results
