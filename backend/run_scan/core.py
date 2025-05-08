import importlib
from backend.scanners import (
    xss_poc,
    sql_injection,
    lfi_scanner,
    command_injection,
    idor_checker
)
def run_full_scan(targets, tests):
    all_tests = {
        "xss_poc": xss_poc,
        "sql_injection": sql_injection,
        "lfi_scanner": lfi_scanner,
        "command_injection": command_injection,
        "idor_checker": idor_checker,
    }

    if "all" in tests:
        tests = list(all_tests.keys())

    results = []

    for target in targets:
        for test in tests:
            if test not in all_tests:
                results.append({
                    "target": target,
                    "test": test,
                    "result": "Greška: test nije prepoznat",
                    "payload": "N/A",
                    "notes": "Nepoznat test"
                })
                continue

            try:
                result = all_tests[test].scan(target)
                results.append(result)
            except Exception as e:
                results.append({
                    "target": target,
                    "test": test,
                    "result": f"Greška: {e}",
                    "payload": "N/A",
                    "notes": "Automatski unos"
                })

    return results
def save_scan_result(targets, tests, results):
    file_path = "scan_history.json"
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            history = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        history = []

    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "targets": targets,
        "tests": tests,
        "results": results
    }

    history.insert(0, entry)
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)
