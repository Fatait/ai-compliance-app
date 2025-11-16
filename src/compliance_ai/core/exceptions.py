# ============================================
# FILE: src/compliance_ai/core/exceptions.py
# ============================================
from fastapi import HTTPException, status

class ComplianceException(HTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

class DocumentNotFoundException(HTTPException):
    def __init__(self, document_id: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document {document_id} not found"
        )