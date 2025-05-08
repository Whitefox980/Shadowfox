from pathlib import Path
import re

ROOT = Path("frontend/src")

def fix_axios_imports():
    pattern = re.compile(r'import\s+axios\s+from\s+["\']@/axios["\']')
    replacement = 'import axios from "@/api/axios"'

    count = 0
    for filepath in ROOT.rglob("*.[jt]sx"):
        text = filepath.read_text()
        if pattern.search(text):
            new_text = pattern.sub(replacement, text)
            filepath.write_text(new_text)
            print(f"Popravljeno: {filepath}")
            count += 1

    if count == 0:
        print("Nema fajlova za izmenu.")
    else:
        print(f"Izmenjeno ukupno: {count} fajlova.")

if __name__ == "__main__":
    fix_axios_imports()
