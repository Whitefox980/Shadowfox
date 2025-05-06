from fastapi import FastAPI
from controllers import scanner, reports

app = FastAPI()

app.include_router(scanner.router, prefix="/scan")
app.include_router(reports.router, prefix="/report")
