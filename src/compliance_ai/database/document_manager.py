# ============================================
# FILE: src/compliance_ai/database/document_manager.py
# ============================================
from compliance_ai.database.vector_store import vector_store
from compliance_ai.models.schemas import DocumentInfo
from typing import List
from datetime import datetime
import uuid

class DocumentManager:
    def add_document(self, title: str, content: str, doc_type: str) -> str:
        """Add a new document."""
        doc_id = str(uuid.uuid4())
        metadata = {
            "title": title,
            "type": doc_type,
            "upload_date": datetime.now().isoformat(),
            "source": title
        }
        vector_store.add_document(doc_id, content, metadata)
        return doc_id
    
    def get_document(self, doc_id: str) -> DocumentInfo:
        """Get document by ID."""
        docs = vector_store.get_all_documents()
        for doc in docs:
            if doc['id'] == doc_id:
                return DocumentInfo(
                    id=doc['id'],
                    title=doc['metadata'].get('title', 'Unknown'),
                    type=doc['metadata'].get('type', 'unknown'),
                    upload_date=doc['metadata'].get('upload_date', '')
                )
        return None
    
    def list_documents(self, doc_type: str = None) -> List[DocumentInfo]:
        """List all documents."""
        docs = vector_store.get_all_documents()
        result = []
        for doc in docs:
            if doc_type is None or doc['metadata'].get('type') == doc_type:
                result.append(DocumentInfo(
                    id=doc['id'],
                    title=doc['metadata'].get('title', 'Unknown'),
                    type=doc['metadata'].get('type', 'unknown'),
                    upload_date=doc['metadata'].get('upload_date', '')
                ))
        return result
    
    def delete_document(self, doc_id: str):
        """Delete document."""
        vector_store.delete_document(doc_id)

document_manager = DocumentManager()