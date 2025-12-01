# ============================================
# FILE: src/compliance_ai/api/routes/chatbot.py
# ============================================
from fastapi import APIRouter, HTTPException, Depends
from compliance_ai.models.schemas import ChatMessage, ChatResponse
from compliance_ai.services.rag_service import rag_service
from compliance_ai.auth.routes import get_current_user
import uuid

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat(message: ChatMessage, current_user: dict = Depends(get_current_user)):
    """Chat with the AI assistant."""
    try:
        response, sources = rag_service.query(message.message)
        
        conversation_id = message.conversation_id or str(uuid.uuid4())
        
        return ChatResponse(
            response=response,
            conversation_id=conversation_id,
            sources=sources
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
async def get_chat_history(conversation_id: str, current_user: dict = Depends(get_current_user)):
    """Get chat history (placeholder)."""
    return {"conversation_id": conversation_id, "messages": []}