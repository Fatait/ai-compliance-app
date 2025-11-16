"""Pytest configuration."""

import pytest
from fastapi.testclient import TestClient
from compliance_ai.main import app

@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)

@pytest.fixture
def sample_chat_message():
    """Sample chat message."""
    return {
        "message": "Qu'est-ce qu'une offre conforme?",
        "conversation_id": None
    }

@pytest.fixture
def sample_compliance_request():
    """Sample compliance request."""
    return {
        "document_id": "test-doc-1",
        "regulation_id": "test-reg-1"
    }

