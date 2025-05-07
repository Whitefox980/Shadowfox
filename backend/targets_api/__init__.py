from fastapi import APIRouter

router = APIRouter()

@router.get("/targets")
def get_targets():
    return {"targets": ["http://example.com"]}
