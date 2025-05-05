import os
import subprocess
from datetime import datetime

# Log fajl
log_dir = "logs"
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, f"log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt")

def log(msg):
    with open(log_file, "a") as f:
        f.write(msg + "\n")
    print(msg)

log("=== BugHunt Session Started ===")

# 1. Pokretanje recon.sh
log("\n[+] Pokrećem recon skriptu...")
try:
    subprocess.run(["bash", "termux_commands/recon.sh"], check=True)
    log("[+] recon.sh uspešno izvršen.")
except subprocess.CalledProcessError:
    log("[-] Greška prilikom izvršavanja recon.sh")

# 2. Pokretanje svih PoC Python skripti
log("\n[+] Pokrećem PoC skripte iz poc_scripts/")
for fname in os.listdir("poc_scripts"):
    if fname.endswith(".py"):
        path = os.path.join("poc_scripts", fname)
        log(f"\n[>] Pokrećem: {fname}")
        try:
            output = subprocess.check_output(["python", path], stderr=subprocess.STDOUT)
            log(output.decode())
        except subprocess.CalledProcessError as e:
            log(f"[-] Greška u {fname}: {e.output.decode()}")

log("\n=== Kraj sesije ===")
