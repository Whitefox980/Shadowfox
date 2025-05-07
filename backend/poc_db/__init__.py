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
