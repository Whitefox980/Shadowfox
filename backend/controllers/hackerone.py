from fastapi import APIRouter

router = APIRouter()

@router.get("/h1-reports")
def get_h1_reports():
    return {"reports": ["Primer H1 izveštaja 1", "Primer H1 izveštaja 2"]}
