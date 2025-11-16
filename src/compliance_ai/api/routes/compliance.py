# ============================================
# FILE: src/compliance_ai/api/routes/compliance.py
# ============================================
from fastapi import APIRouter, HTTPException
from compliance_ai.models.schemas import ComplianceRequest, ComplianceResult
from compliance_ai.services.compliance_service import compliance_service

router = APIRouter()

@router.post("/analyze", response_model=ComplianceResult)
async def analyze_compliance(request: ComplianceRequest):
    """Analyze document compliance."""
    try:
        result = compliance_service.analyze_compliance(
            request.document_id,
            request.regulation_id
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/reports")
async def list_reports():
    """List compliance reports."""
    return {"reports": []}