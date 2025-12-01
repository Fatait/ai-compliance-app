# ============================================
# FILE: src/compliance_ai/database/local_db.py
# ============================================
import json
from pathlib import Path

USERS_DB_FILE = Path("data/users.json")


def _load_users_db():
    if not USERS_DB_FILE.exists():
        return {}
    with open(USERS_DB_FILE, "r") as f:
        return json.load(f)


def _save_users_db(db):
    USERS_DB_FILE.parent.mkdir(exist_ok=True)
    with open(USERS_DB_FILE, "w") as f:
        json.dump(db, f, indent=4)


def get_user(username: str):
    db = _load_users_db()
    return db.get(username)


def create_user(username: str, hashed_password: str):
    db = _load_users_db()
    db[username] = {"username": username, "hashed_password": hashed_password}
    _save_users_db(db)
    return db[username]
