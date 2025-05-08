from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3

router = APIRouter()
DB_NAME = "shadowfox.db"

class Tool(BaseModel):
    name: str
    description: str

@router.get("/api/tools")
def list_tools():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS tools (name TEXT, description TEXT)")
        c.execute("SELECT name, description FROM tools")
        data = [{"name": row[0], "description": row[1]} for row in c.fetchall()]
    return {"tools": data}

@router.post("/api/tools")
def add_tool(tool: Tool):
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS tools (name TEXT, description TEXT)")
        c.execute("INSERT INTO tools (name, description) VALUES (?, ?)", (tool.name, tool.description))
        conn.commit()
    return {"message": "Alat dodat."}
