import sqlite3

def get_all_targets():
    conn = sqlite3.connect("shadowfox.db")
    c = conn.cursor()
    c.execute("SELECT id, name, address FROM targets")
    rows = c.fetchall()
    conn.close()
    return [{"id": row[0], "name": row[1], "address": row[2]} for row in rows]
