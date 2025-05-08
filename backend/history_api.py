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
@router.post("/api/scan-history/clear")
def clear_scan_history():
    try:
        with open("scan_history.json", "w", encoding="utf-8") as f:
            json.dump([], f, indent=4)
        return JSONResponse(content={"message": "Istorija obrisana."})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
@router.post("/api/scan-history/clear")
def clear_scan_history():
    file_path = "scan_history.json"
    if os.path.exists(file_path):
        os.remove(file_path)
    return JSONResponse(content={"message": "Istorija obrisana."})
