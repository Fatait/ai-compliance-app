"""Application configuration."""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    """Application settings."""
    
    # API
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = True
    
    # AI/ML
    HF_MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"
    VECTOR_DB_PATH: str = "./data/vector_db"
    GROQ_API_KEY: str
    
    # CORS - Use string that we'll split manually
    ALLOWED_ORIGINS_STR: str = "http://localhost:5173,http://localhost:3000"
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
        
    @property
    def ALLOWED_ORIGINS(self) -> List[str]:
        """Parse ALLOWED_ORIGINS from comma-separated string."""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS_STR.split(",")]



settings = Settings()