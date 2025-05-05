# utils/log_utils.py

import os
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

# Google Sheet podešavanja
SHEET_NAME = "BugHuntLog"
SCOPE = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
KEY_FILE = "boxwood-airport-458920-e1-8dac401546e1.json"

def log_to_sheet(script_path, result):
    creds = Credentials.from_service_account_file(KEY_FILE, scopes=SCOPE)
    client = gspread.authorize(creds)
    sheet = client.open(SHEET_NAME).sheet1

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    row = [now, script_path, result[:500]]  # Ograniči prikaz rezultata na 500 karaktera
    sheet.append_row(row)
