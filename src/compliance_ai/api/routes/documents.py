# ============================================
# FILE: src/compliance_ai/api/routes/documents.py
# ============================================
from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from compliance_ai.database.document_manager import document_manager
from compliance_ai.utils.file_processor import file_processor
from typing import List, Optional
import tempfile
import os

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    title: str = Query(...),
    doc_type: str = Query(..., pattern="^(offer|regulation)$")
):
    """Upload a document."""
    try:
        # Save temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        
        # Extract text
        text = file_processor.process_file(tmp_path)
        os.unlink(tmp_path)
        
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract text from file")
        
        # Add to database
        doc_id = document_manager.add_document(title, text, doc_type)
        
        return {
            "message": "Document uploaded successfully",
            "document_id": doc_id,
            "title": title
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
async def list_documents(doc_type: Optional[str] = None):
    """List all documents."""
    try:
        documents = document_manager.list_documents(doc_type)
        return {"documents": documents}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{document_id}")
async def delete_document(document_id: str):
    """Delete a document."""
    try:
        document_manager.delete_document(document_id)
        return {"message": "Document deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))