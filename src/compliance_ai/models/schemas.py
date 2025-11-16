# ============================================
# FILE: src/compliance_ai/models/schemas.py
# ============================================
from pydantic import BaseModel, Field
from typing import List, Optional

class ChatMessage(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    sources: List[str] = []

class ComplianceRequest(BaseModel):
    document_id: str
    regulation_id: str

class ComplianceResult(BaseModel):
    compliant: bool
    score: float = Field(..., ge=0.0, le=1.0)
    issues: List[str] = []
    recommendations: List[str] = []

class DocumentInfo(BaseModel):
    id: str
    title: str
    type: str
    upload_date: str