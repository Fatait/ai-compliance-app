# ============================================
# FILE: src/compliance_ai/main.py
# ============================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from compliance_ai.core.config import settings
from compliance_ai.api.routes import chatbot, compliance, health, documents
from compliance_ai.auth import routes as auth_routes

app = FastAPI(
    title="AI Compliance API",
    description="API for AI-powered compliance analysis",
    version="0.1.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(health.router, tags=["health"])
app.include_router(chatbot.router, prefix="/api/v1/chat", tags=["chatbot"])
app.include_router(compliance.router, prefix="/api/v1/compliance", tags=["compliance"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["documents"])
app.include_router(auth_routes.router, prefix="/api/v1/auth", tags=["auth"])

@app.get("/")
async def root():
    return {
        "message": "AI Compliance API",
        "version": "0.1.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.API_HOST, port=settings.API_PORT)