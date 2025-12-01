from groq import Groq
from typing import List
from compliance_ai.core.config import settings
from compliance_ai.utils.logger import logger

class LLMService:
    def __init__(self):
        try:
            # Get free API key from: https://console.groq.com
            self.client = Groq(api_key=settings.GROQ_API_KEY)
            # Available models: llama-3.1-70b-versatile, mixtral-8x7b-32768, gemma-7b-it
            self.model = "openai/gpt-oss-120b"  # Fast and good quality
            logger.info("Groq client initialized successfully.")
        except Exception as e:
            logger.error(f"Error initializing Groq client: {e}")
            raise

    def generate_response(self, query: str, context: List[str]) -> str:
        """Generate response using Groq Cloud."""
        if not context:
            return "Je n'ai pas trouvé d'informations pertinentes pour répondre à votre question."
        
        # Build context
        context_text = "\n\n".join([f"Document {i+1}:\n{doc[:500]}" for i, doc in enumerate(context)])
        
        try:
            # Call Groq API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": """Tu es un assistant spécialisé en conformité réglementaire. Réponds en français de manière claire, précise et professionnelle.
                                    N'utilise jamais de diagrammes Mermaid, aucun schéma, et aucun formatage qui ressemble à du code """
                    },
                    {
                        "role": "user",
                        "content": f"Contexte:\n{context_text}\n\nQuestion: {query}\n\nRéponds en te basant uniquement sur le contexte fourni."
                    }
                ],
                temperature=0.7,
                max_tokens=60000
            )
            logger.info("Groq API call successful.")
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error calling Groq API: {e}")
            raise

llm_service = LLMService()
