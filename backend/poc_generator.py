from fastapi import APIRouter
from pydantic import BaseModel
from backend.poc_store import save_poc, get_all_poc, delete_all_poc

router = APIRouter()

class PocRequest(BaseModel):
    target: str
    vulnerability: str
    payload: str
    notes: str

@router.post("/api/generate-poc")
async def generate_poc(data: PocRequest):
    save_poc(data.dict())
    report = (
        f"PoC for {data.vulnerability} on {data.target}\n"
        f"Payload used: {data.payload}\n"
        f"Result: {data.notes}"
    )
    return {"report": report}

@router.get("/api/poc-list")
async def list_poc():
    return {"data": get_all_poc()}

@router.delete("/api/poc-clear")
async def clear_poc():
    delete_all_poc()
    return {"message": "All PoC entries deleted."}
from fastapi.responses import FileResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os

@router.get("/api/poc-export")
def export_poc():
    from backend.poc_store import get_all_poc
    data = get_all_poc()
    if not data:
        return {"error": "Nema izveštaja za eksport."}

    pdf_path = "poc_export.pdf"
    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter

    y = height - 40
    for r in data:
        text = f"#{r[0]} | {r[5]}\nTarget: {r[1]}\nVulnerability: {r[2]}\nPayload: {r[3]}\nResult: {r[4]}"
        for line in text.split("\n"):
            c.drawString(50, y, line)
            y -= 15
            if y < 50:
                c.showPage()
                y = height - 40
        y -= 10

    c.save()
    return FileResponse(path=pdf_path, filename="poc_export.pdf", media_type="application/pdf")
