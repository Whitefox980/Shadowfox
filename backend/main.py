from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.controllers import scanner, hackerone, bugcrowd
import os
import json
import importlib
from backend.poc_db import init_db
from backend.poc_generator import router as poc_router

app = FastAPI()

init_db()
app.include_router(poc_router)


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
