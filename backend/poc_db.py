import sqlite3

DB_NAME = "shadowfox.db"

def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS poc_reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                target TEXT,
                vulnerability TEXT,
                payload TEXT,
                notes TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
