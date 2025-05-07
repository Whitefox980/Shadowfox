import os
import json
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/api/scan-history")
def get_scan_history():
    file_path = "scan_history.json"
    if not os.path.exists(file_path):
        return JSONResponse(content={"history": []})

    with open(file_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            return JSONResponse(content={"history": []})

    return JSONResponse(content={"history": data})
from datetime import datetime

def save_scan_result(target, test, result):
    entry = {
        "target": target,
        "test": test,
        "result": result,
        "timestamp": datetime.utcnow().isoformat()
    }

    file_path = "scan_history.json"

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    data.append(entry)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
