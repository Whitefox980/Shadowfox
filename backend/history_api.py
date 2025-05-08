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

def save_scan_result(target, test_type, result, payload="", notes=""):
    data = {
        "target": target,
        "vulnerability": result,
        "payload": payload,
        "notes": notes
    }
    with open("scan_history.json", "r+", encoding="utf-8") as f:
        try:
            history = json.load(f)
        except json.JSONDecodeError:
            history = []
        history.append(data)
        f.seek(0)
        json.dump(history, f, indent=4, ensure_ascii=False)
