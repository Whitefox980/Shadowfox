from fastapi import APIRouter
from pydantic import BaseModel
from backend.targets_store import save_target, init_targets_db
import sqlite3
from fastapi.responses import JSONResponse

@router.get("/api/targets")
def get_all_targets():
    with sqlite3.connect("targets.db") as conn:
        c = conn.cursor()
        c.execute("SELECT id, name, url, comment, priority, created_at FROM targets ORDER BY id DESC")
        results = c.fetchall()
    return {"data": results}

@router.delete("/api/targets/{target_id}")
def delete_target(target_id: int):
    with sqlite3.connect("targets.db") as conn:
        c = conn.cursor()
        c.execute("DELETE FROM targets WHERE id = ?", (target_id,))
        conn.commit()
    return {"message": "Meta obrisana"}
router = APIRouter()
init_targets_db()

class TargetRequest(BaseModel):
    name: str
    url: str
    comment: str
    priority: str

@router.post("/api/add-target")
async def add_target(data: TargetRequest):
    save_target(data.dict())
    return {"message": "Meta sačuvana!"}
