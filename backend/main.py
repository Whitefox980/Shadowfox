from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.controllers import scanner, hackerone, bugcrowd
import os
import json
import importlib
from backend.poc_db import init_db
from backend.poc_generator import router as poc_router
from backend.targets_api import router as targets_router
app.include_router(targets_router)

app = FastAPI()

init_db()
app.include_router(poc_router)
from fastapi import Request
from backend.run_scan import run_full_scan
from fastapi.responses import JSONResponse
import sqlite3
@app.get("/api/vuln-stats")
def vuln_stats():
    import sqlite3
    with sqlite3.connect("shadowfox.db") as conn:
        c = conn.cursor()
        c.execute("""
            SELECT vuln, COUNT(*) FROM poc_reports
            GROUP BY vuln
            ORDER BY COUNT(*) DESC
        """)
        data = c.fetchall()
    return {"data": data}
@app.get("/api/dashboard")
def get_dashboard():
    with sqlite3.connect("targets.db") as t_conn, sqlite3.connect("shadowfox.db") as p_conn:
        t_cursor = t_conn.cursor()
        p_cursor = p_conn.cursor()

        t_cursor.execute("SELECT COUNT(*) FROM targets")
        targets_count = t_cursor.fetchone()[0]

        p_cursor.execute("SELECT COUNT(*) FROM poc_reports")
        reports_count = p_cursor.fetchone()[0]

    return JSONResponse({
        "targets": targets_count,
        "reports": reports_count,
        "last_export": "N/A"  # možeš kasnije dodati timestamp iz export loga
    })
@app.post("/run-scan")
async def run_scan(req: Request):
    data = await req.json()
    targets = data.get("targets", [])
    tests = data.get("tests", [])

    if not targets or not tests:
        return {"error": "Nisu prosleđene mete ili testovi."}

    results = run_full_scan(targets, tests)
    return {"message": "Skeniranje završeno", "results": results}

# CORS pre bilo koje rute
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # možeš staviti i tačno: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include svih ruta
app.include_router(scanner.router)
app.include_router(hackerone.router)
app.include_router(bugcrowd.router)

# Targets fajl
try:
    with open("targets.txt", "r") as f:
        targets = list(set(line.strip() for line in f.readlines()))
except FileNotFoundError:
    targets = []

@app.post("/add-target")
async def add_target(target: str):
    target = target.strip()
    if target and target not in targets:
        targets.append(target)
        with open("targets.txt", "a") as f:
            f.write(target + "\n")
    return {"status": "added", "target": target}

@app.get("/get-targets")
async def get_targets():
    return {"targets": targets}

@app.get("/api/tests")
def get_available_tests():
    with open("config/tests.json") as f:
        tests = json.load(f)
    return JSONResponse(content=tests)

@app.post("/run-scan")
async def run_scan(request: Request):
    data = await request.json()
    selected_tests = data.get("tests", [])
    results = []

    for target in targets:
        for test in selected_tests:
            try:
                module = importlib.import_module(f"poc_scripts.{test}")
                if hasattr(module, "run"):
                    output = module.run(target)
                    results.append(f"[{test}] {output}")
                else:
                    results.append(f"[{test}] Nema run() funkcije.")
            except Exception as e:
                results.append(f"[{test}] Greška: {str(e)}")

    return {"output": "\n".join(results)}
