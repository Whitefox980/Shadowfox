import sqlite3

DB_NAME = "targets.db"

def init_targets_db():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS targets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                url TEXT,
                comment TEXT,
                priority TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()

def save_target(data):
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("""
            INSERT INTO targets (name, url, comment, priority)
            VALUES (?, ?, ?, ?)
        """, (data["name"], data["url"], data["comment"], data["priority"]))
        conn.commit()
