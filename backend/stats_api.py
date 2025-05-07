from fastapi import APIRouter
from fastapi.responses import JSONResponse
import sqlite3

router = APIRouter()

@router.get("/api/poc-stats")
def get_poc_stats():
    try:
        conn = sqlite3.connect("shadowfox.db")
        cursor = conn.cursor()
        cursor.execute("SELECT vulnerability, COUNT(*) FROM poc_reports GROUP BY vulnerability")
        results = cursor.fetchall()
        stats = [{"vulnerability": row[0], "count": row[1]} for row in results]
        return JSONResponse(content={"stats": stats})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@router.get("/api/stats-dashboard")
def get_dashboard_stats():
    try:
        conn = sqlite3.connect("shadowfox.db")
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM poc_reports")
        total_reports = cursor.fetchone()[0]
        cursor.execute("SELECT DISTINCT vulnerability FROM poc_reports")
        test_types = [row[0] for row in cursor.fetchall()]
        return JSONResponse(content={
            "total_reports": total_reports,
            "test_types": test_types
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
