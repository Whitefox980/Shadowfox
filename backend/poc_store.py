from backend.targets_store import DB_NAME
import sqlite3

DB_NAME = "shadowfox.db"
def get_all_poc():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("SELECT id, target, vuln, payload, result, created_at FROM poc_reports ORDER BY id DESC")
        return c.fetchall()
def save_poc(data):
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("""
            INSERT INTO poc_reports (target, vulnerability, payload, notes)
            VALUES (?, ?, ?, ?)
        """, (data["target"], data["vulnerability"], data["payload"], data["notes"]))
        conn.commit()

def get_all_poc():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("SELECT id, target, vulnerability, payload, notes, created_at FROM poc_reports ORDER BY id DESC")
        return c.fetchall()

def delete_all_poc():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("DELETE FROM poc_reports")
        conn.commit()
