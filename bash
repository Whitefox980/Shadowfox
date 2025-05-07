#!/bin/bash

mkdir -p backend/{controllers,poc_db,poc_generator,run_scan,targets_api}
touch backend/{__init__.py,main.py}
touch backend/controllers/__init__.py
touch backend/poc_db/{__init__.py}
touch backend/poc_generator/__init__.py
touch backend/run_scan/{__init__.py,core.py}
touch backend/targets_api/__init__.py

# controllers
cat <<EOF > backend/controllers/__init__.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
def get_status():
    return {"message": "Kontroler aktivan"}
EOF

# poc_db
cat <<EOF > backend/poc_db/__init__.py
import sqlite3

def init_db():
    conn = sqlite3.connect("shadowfox.db")
    c = conn.cursor()
    c.execute("""
    CREATE TABLE IF NOT EXISTS poc_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vuln TEXT,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )""")
    c.execute("""
    CREATE TABLE IF NOT EXISTS targets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )""")
    conn.commit()
    conn.close()
EOF

# poc_generator
cat <<EOF > backend/poc_generator/__init__.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/generate-poc")
def generate_poc():
    return {"poc": "Primer POC generisan"}
EOF

# run_scan/core.py
cat <<EOF > backend/run_scan/core.py
def run_full_scan(targets: list, tests: list):
    results = []
    for target in targets:
        for test in tests:
            try:
                output = f"Simuliram {test} za {target}"
                results.append(f"[{test}] {output}")
            except Exception as e:
                results.append(f"[{test}] Greška: {str(e)}")
    return results
EOF

# run_scan/__init__.py
echo "from backend.run_scan.core import run_full_scan" > backend/run_scan/__init__.py

# targets_api
cat <<EOF > backend/targets_api/__init__.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/targets")
def get_targets():
    return {"targets": ["http://example.com"]}
EOF

# main.py
cat <<EOF > backend/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.controllers import router as controllers_router
from backend.poc_generator import router as poc_router
from backend.targets_api import router as targets_router
from backend.run_scan.core import run_full_scan
from backend.poc_db import init_db

import sqlite3

app = FastAPI()
init_db()

app.include_router(controllers_router)
app.include_router(poc_router)
app.include_router(targets_router)

@app.get("/api/vuln-stats")
def vuln_stats():
    with sqlite3.connect("shadowfox.db") as conn:
        c = conn.cursor()
        c.execute("""
        SELECT vuln, COUNT(*) FROM poc_reports
        GROUP BY vuln
        ORDER BY COUNT(*) DESC
        """)
        data = c.fetchall()
    return JSONResponse(content={"data": data})
EOF

echo "ShadowFox backend uspešno postavljen."
