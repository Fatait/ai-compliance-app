from compliance_ai.services.embedding_service import embedding_service
from compliance_ai.services.llm_service import llm_service
from compliance_ai.database.vector_store import vector_store
from typing import List

class RAGService:
    def query(self, question: str, top_k: int = 3) -> tuple[str, List[str]]:
        """Query using RAG pipeline."""
        # 1. Search for relevant documents
        results = vector_store.search(question, top_k=top_k)
        
        # 2. Extract context
        context = [doc["text"] for doc in results]
        sources = [doc["metadata"].get("source", "Unknown") for doc in results]
        
        # 3. Generate response
        response = llm_service.generate_response(question, context)
        
        return response, sources

rag_service = RAGService()