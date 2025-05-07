# utils/log_utils.py

import os
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

# Google Sheet podešavanja
SHEET_NAME = "BugHuntLog"
SCOPE = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
KEY_FILE = "config/boxwood-airport-458920-e1-3598ef22bc61.json"

def log_to_sheet(script_name, message):
    print(f"[log-to-sheet] {script_name}: {message}")
def classify_severity(result: str) -> str:
    result = result.lower()
    if "sql" in result or "auth bypass" in result:
        return "Critical"
    elif "idor" in result or "rfi" in result:
        return "High"
    elif "lfi" in result or "xss" in result:
        return "Medium"
    elif "refleksije" in result or "parametar" in result:
        return "Low"
    return "Unknown"
import json

def log_to_json(vuln_dict, json_path="results/json/vulnerabilities_export.json"):
    os.makedirs(os.path.dirname(json_path), exist_ok=True)

    try:
        # Ako fajl postoji, učitaj postojeće ranjivosti
        if os.path.exists(json_path):
            with open(json_path, "r") as f:
                data = json.load(f)
        else:
            data = []

        data.append(vuln_dict)

        with open(json_path, "w") as f:
            json.dump(data, f, indent=4)

        print(f"[+] Ranjivost upisana u JSON: {vuln_dict.get('target')}")

    except Exception as e:
        print(f"[-] Greška pri upisu u JSON: {str(e)}")
if __name__ == "__main__":
    log_to_sheet("manual_test", "ShadowFox log uspešan")
