# ============================================
# FILE: src/compliance_ai/services/embedding_service.py
# ============================================
from sentence_transformers import SentenceTransformer
from compliance_ai.core.config import settings
from typing import List
import numpy as np

class EmbeddingService:
    def __init__(self):
        self.model = SentenceTransformer(settings.HF_MODEL_NAME)
    
    def embed_text(self, text: str) -> List[float]:
        """Generate embedding for text."""
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding.tolist()
    
    def embed_batch(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts."""
        embeddings = self.model.encode(texts, convert_to_numpy=True)
        return embeddings.tolist()

embedding_service = EmbeddingService()