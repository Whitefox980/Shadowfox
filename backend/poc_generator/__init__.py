from fastapi import APIRouter

router = APIRouter()

@router.get("/generate-poc")
def generate_poc():
    return {"poc": "Primer POC generisan"}
