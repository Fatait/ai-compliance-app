"""Pytest configuration."""

import pytest
from fastapi.testclient import TestClient
from compliance_ai.main import app

@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)


@pytest.fixture
def authenticated_client(client: TestClient):
    """Create an authenticated test client."""
    user_data = {"username": "testuser", "password": "testpassword"}
    client.post("/api/v1/auth/register", json=user_data)

    login_data = {"username": "testuser", "password": "testpassword"}
    response = client.post("/api/v1/auth/login", data=login_data)
    token = response.json()["access_token"]

    client.headers = {"Authorization": f"Bearer {token}"}
    return client


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

