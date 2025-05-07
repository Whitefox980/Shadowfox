import os
import glob
import gspread
from oauth2client.service_account import ServiceAccountCredentials

def get_gspread_client():
    json_files = glob.glob("config/*.json")
    if not json_files:
        raise FileNotFoundError("Nijedan .json fajl nije pronađen u 'config/' direktorijumu.")
    
    credentials_path = json_files[0]
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name(credentials_path, scope)
    client = gspread.authorize(creds)
    return client
