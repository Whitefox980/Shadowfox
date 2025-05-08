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

from datetime import datetime
from fastapi import Request

@router.post("/api/scan-history/save")
async def save_scan_result(request: Request):
    data = await request.json()

    scan_entry = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "targets": data.get("targets", []),
        "tests": data.get("tests", []),
        "results": data.get("results", [])
    }

    try:
        with open("scan_history.json", "r+", encoding="utf-8") as f:
            try:
                history = json.load(f)
            except json.JSONDecodeError:
                history = []
            history.append(scan_entry)
            f.seek(0)
            json.dump(history, f, indent=4, ensure_ascii=False)
        return {"message": "Sken rezultat sačuvan."}
    except Exception as e:
        return {"error": str(e)}
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
