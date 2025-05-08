from fastapi import APIRouter
from fastapi.responses import JSONResponse
import os, json
from datetime import datetime

router = APIRouter()

file_path = "scan_history.json"

@router.get("/api/scan-history")
def get_scan_history():
    if not os.path.exists(file_path):
        return JSONResponse(content={"history": []})

    with open(file_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            return JSONResponse(content={"history": []})
    return JSONResponse(content={"history": data})


@router.post("/api/scan-history")
def save_scan_result(targets: list, tests: list, payload: str = "", notes: str = ""):
    new_entry = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "targets": targets,
        "tests": tests,
        "payload": payload,
        "notes": notes
    }

    history = []
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            try:
                history = json.load(f)
            except json.JSONDecodeError:
                pass

    history.append(new_entry)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=4, ensure_ascii=False)

    return JSONResponse(content={"message": "Rezultat sačuvan."})


@router.post("/api/scan-history/clear")
def clear_scan_history():
    if os.path.exists(file_path):
        os.remove(file_path)
    return JSONResponse(content={"message": "Istorija obrisana."})
