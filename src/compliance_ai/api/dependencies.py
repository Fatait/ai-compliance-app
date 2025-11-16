# ============================================
# FILE: src/compliance_ai/api/dependencies.py
# ============================================
from fastapi import Depends, HTTPException, status
from typing import Optional

async def get_current_user(token: Optional[str] = None):
    """Get current user (placeholder for auth)."""
    # TODO: Implement Firebase auth
    return {"user_id": "demo_user"}