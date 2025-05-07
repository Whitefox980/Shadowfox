import importlib

def run_full_scan(targets, tests):
    results = []

    for target in targets:
        for test in tests:
            try:
                # Dinamički uvozi modul iz scanners foldera
                module = importlib.import_module(f"backend.scanners.{test}")
                output = module.scan(target)  # Mora da postoji scan(target) funkcija

                result_text = output.get("result", "Nema rezultata")
                payload = output.get("payload", "Nema payloada")

            except Exception as e:
                result_text = f"Greška: {str(e)}"
                payload = "N/A"

            results.append({
                "target": target,
                "test": test,
                "result": result_text,
                "payload": payload,
                "notes": "Automatski unos"
            })

    return results
import json
from datetime import datetime

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
