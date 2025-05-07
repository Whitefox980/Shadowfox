import sqlite3

def init_db():
    conn = sqlite3.connect("shadowfox.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS poc_reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vuln TEXT,
            target TEXT,
            timestamp TEXT
        )
    """)
    conn.commit()
    conn.close()
