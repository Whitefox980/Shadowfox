from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os, json, sqlite3

from backend.targets_store import init_targets_db
from backend.stats_api import router as stats_router
from backend.run_scan_api import router as scan_router
from backend.controllers import scanner, hackerone, bugcrowd
from backend.poc_db import init_db
from backend.poc_generator import router as poc_router
from backend.targets_api import router as targets_router
from backend.history_api import save_scan_result
from backend.run_scan.core import run_full_scan
from backend.history_api import router as history_router


from backend.controllers.bugcrowd import router as bug_router
from backend.controllers.hackerone import router as h1_router
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
init_targets_db()
# ROUTERI
app.include_router(targets_router)
app.include_router(h1_router)
app.include_router(bug_router)
app.include_router(history_router)
app.include_router(stats_router)
app.include_router(scan_router)
app.include_router(poc_router)
app.include_router(targets_router)
app.include_router(scanner.router)
app.include_router(hackerone.router)
app.include_router(bugcrowd.router)

# Rute: Meta fajl

try:
    with open("targets.txt", "r") as f:
        targets = list(set(line.strip() for line in f.readlines()))
except FileNotFoundError:
    targets = []

@app.get("/api/poc-list")
def get_poc_list():
    with sqlite3.connect("shadowfox.db") as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM poc_reports")
        return JSONResponse(content={"data": c.fetchall()})

@app.get("/api/poc-export")
def export_poc_list():
    return FileResponse("poc_reports_export.pdf", media_type="application/pdf")
@app.get("/api/poc-list")
def get_poc_list():
    try:
        with sqlite3.connect("shadowfox.db") as conn:
            c = conn.cursor()
            c.execute("SELECT * FROM poc_reports")
            data = c.fetchall()
            return JSONResponse(content={"data": data})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
@app.get("/api/vuln-stats")
def vuln_stats():
    with sqlite3.connect("shadowfox.db") as conn:
        c = conn.cursor()
        c.execute("""
            SELECT vuln, COUNT(*) FROM poc_reports
            GROUP BY vuln
            ORDER BY COUNT(*) DESC
        """)
        return JSONResponse(content={"data": c.fetchall()})

@app.get("/api/dashboard")
def get_dashboard():
    with sqlite3.connect("targets.db") as t_conn, sqlite3.connect("shadowfox.db") as p_conn:
        t_cursor = t_conn.cursor()
        p_cursor = p_conn.cursor()
        t_cursor.execute("SELECT COUNT(*) FROM targets")
        p_cursor.execute("SELECT COUNT(*) FROM poc_reports")
        return JSONResponse({
            "targets": t_cursor.fetchone()[0],
            "reports": p_cursor.fetchone()[0],
            "last_export": "N/A"
        })

@app.get("/api/tests")
def get_tests():
    with open("config/tests.json") as f:
        return JSONResponse(content=json.load(f))

from pydantic import BaseModel

class TargetRequest(BaseModel):
    name: str
    url: str
    comment: str
    priority: str

@app.post("/api/add-target")
async def add_target(data: TargetRequest):
    with sqlite3.connect("targets.db") as conn:
        c = conn.cursor()
        c.execute(
            "INSERT INTO targets (name, url, comment, priority) VALUES (?, ?, ?, ?)",
            (data.name, data.url, data.comment, data.priority)
        )
        conn.commit()
    return {"message": "Meta sačuvana!"}

@app.delete("/api/targets/{target_id}")
def delete_target(target_id: int):
    with sqlite3.connect("targets.db") as conn:
        c = conn.cursor()
        c.execute("DELETE FROM targets WHERE id = ?", (target_id,))
        conn.commit()
    return {"status": "deleted"}

@app.get("/api/targets")
def list_targets():
    with sqlite3.connect("targets.db") as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM targets")
        return JSONResponse(content={"data": c.fetchall()})

@app.post("/api/targets")
async def add_targets_bulk(request: Request):
    data = await request.json()
    metas = [data.get("meta1"), data.get("meta2"), data.get("meta3")]
    return JSONResponse(content={"data": metas})

@app.post("/run-scan")
async def run_scan(request: Request):
    data = await request.json()
    targets = data.get("targets", [])
    tests = data.get("tests", [])
    if not targets or not tests:
        return {"error": "Nisu prosleđene mete ili testovi."}

    results = run_full_scan(targets, tests)
    for r in results:
        save_scan_result(r.get("target", ""), r.get("test", ""), r.get("result", ""))
    return {"message": "Skeniranje završeno", "results": results}


@app.get("/api/scan-history")
def get_scan_history():
    import sqlite3
    with sqlite3.connect("shadowfox.db") as conn:
        c = conn.cursor()
        c.execute("SELECT id, timestamp, target, test, result FROM scan_results ORDER BY timestamp DESC")
        data = c.fetchall()
    return {"data": data}
