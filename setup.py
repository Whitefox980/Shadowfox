from pathlib import Path
import re

poc_dir = Path('poc_scripts')

# Obilazi sve .py fajlove u folderu
for file in poc_dir.glob('*.py'):
    content = file.read_text()
    # Ispravlja lošu liniju
    fixed = re.sub(r"\+ f' \| Severity: \{\{severity\}\}\)'\)", ")", content)
    fixed = re.sub(r"\+ f' \| Severity: \{\{severity\}\}\)'", "", fixed)  # za slučaj bez zagrade viška
    # Ispravlja i slučajeve sa + f bez potrebe
    fixed = re.sub(r"\)\s*\+\s*f' \| Severity: \{\{severity\}\}\''", ")", fixed)
    file.write_text(fixed)

print("Greške su ispravljene u svim fajlovima.")
