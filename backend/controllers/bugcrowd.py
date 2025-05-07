from fastapi import APIRouter

router = APIRouter()

@router.get("/bugcrowd-reports")
def get_bugcrowd_reports():
    return {"reports": ["Primer Bugcrowd izveštaja 1", "Primer Bugcrowd izveštaja 2"]}
