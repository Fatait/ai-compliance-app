# ============================================
# FILE: src/compliance_ai/api/routes/health.py
# ============================================
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "AI Compliance API"}

@router.get("/api/v1/status")
async def status():
    """Status endpoint."""
    return {
        "status": "running",
        "version": "0.1.0",
        "features": ["chatbot", "compliance_analysis", "document_management"]
    }
