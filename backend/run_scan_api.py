from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from backend.run_scan.core import run_full_scan
from backend.history_api import save_scan_result

router = APIRouter()

@router.post("/api/run-scan")
async def run_scan(request: Request):
    try:
        data = await request.json()
        print("PRIMLJENI PODACI:", data, type(data))  # Debug

        targets = data.get("targets", [])
        tests = data.get("tests", [])

        if not targets or not tests:
            return JSONResponse(content={"error": "Nisu prosleđene mete ili testovi"}, status_code=400)

        results = run_full_scan(targets, tests)

        for r in results:
            save_scan_result(
                r.get("target", ""),
                r.get("test", ""),
                r.get("result", ""),
                r.get("payload", ""),
                r.get("notes", "")
            )

        return JSONResponse(content={"message": "Skeniranje završeno", "results": results})

    except Exception as e:
        print("GREŠKA U SCAN:", e)
        return JSONResponse(content={"error": str(e)}, status_code=500)
