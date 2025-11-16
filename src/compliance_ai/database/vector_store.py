# ============================================
# FILE: src/compliance_ai/database/vector_store.py
# ============================================
import chromadb
from chromadb.config import Settings as ChromaSettings
from compliance_ai.core.config import settings
from compliance_ai.services.embedding_service import embedding_service
from typing import List, Dict
import os

class VectorStore:
    def __init__(self):
        os.makedirs(settings.VECTOR_DB_PATH, exist_ok=True)
        self.client = chromadb.PersistentClient(
            path=settings.VECTOR_DB_PATH,
            settings=ChromaSettings(anonymized_telemetry=False)
        )
        self.collection = self.client.get_or_create_collection(
            name="compliance_docs",
            metadata={"description": "Compliance documents and regulations"}
        )
    
    def add_document(self, doc_id: str, text: str, metadata: Dict):
        """Add document to vector store."""
        embedding = embedding_service.embed_text(text)
        self.collection.add(
            ids=[doc_id],
            embeddings=[embedding],
            documents=[text],
            metadatas=[metadata]
        )
    
    def search(self, query: str, top_k: int = 3) -> List[Dict]:
        """Search for similar documents."""
        query_embedding = embedding_service.embed_text(query)
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        
        documents = []
        if results['documents'] and results['documents'][0]:
            for i, doc in enumerate(results['documents'][0]):
                documents.append({
                    "text": doc,
                    "metadata": results['metadatas'][0][i] if results['metadatas'] else {},
                    "distance": results['distances'][0][i] if results['distances'] else 0
                })
        
        return documents
    
    def delete_document(self, doc_id: str):
        """Delete document from vector store."""
        self.collection.delete(ids=[doc_id])
    
    def get_all_documents(self) -> List[Dict]:
        """Get all documents."""
        results = self.collection.get()
        documents = []
        if results['documents']:
            for i, doc in enumerate(results['documents']):
                documents.append({
                    "id": results['ids'][i],
                    "text": doc,
                    "metadata": results['metadatas'][i] if results['metadatas'] else {}
                })
        return documents

vector_store = VectorStore()