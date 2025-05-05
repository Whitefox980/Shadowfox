import os
from datetime import datetime

results_dir = "results"
report_dir = "reports"
os.makedirs(report_dir, exist_ok=True)

report_file = os.path.join(report_dir, f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md")

with open(report_file, "w") as rep:
    rep.write(f"# BugHunt Izveštaj - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
    for fname in os.listdir(results_dir):
        path = os.path.join(results_dir, fname)
        if os.path.isfile(path):
            rep.write(f"## {fname}\n")
            with open(path, "r") as f:
                lines = f.readlines()
                rep.write(f"- Broj linija: {len(lines)}\n")
                rep.write(f"- Prvi red: {lines[0].strip() if lines else 'N/A'}\n\n")

print(f"[+] Izveštaj generisan: {report_file}")
