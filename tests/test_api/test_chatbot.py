"""Tests for chatbot endpoints."""
from unittest.mock import patch


def test_chat_endpoint(authenticated_client, sample_chat_message):
    """Test chat endpoint."""
    with patch("compliance_ai.services.rag_service.rag_service.query") as mock_query:
        mock_query.return_value = ("Test response", ["Source 1", "Source 2"])
        response = authenticated_client.post("/api/v1/chat/", json=sample_chat_message)
        assert response.status_code == 200
        data = response.json()
        assert data["response"] == "Test response"
        assert data["sources"] == ["Source 1", "Source 2"]


def test_chat_with_empty_message(authenticated_client):
    """Test chat with empty message."""
    response = authenticated_client.post("/api/v1/chat/", json={"message": "", "conversation_id": "test"})
    assert response.status_code == 422
    assert "String should have at least 1 character" in response.json()["detail"][0]["msg"]
