"""Tests for chatbot endpoints."""

def test_chat_endpoint(client, sample_chat_message):
    """Test chat endpoint."""
    response = client.post("/api/v1/chat/", json=sample_chat_message)
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert "conversation_id" in data
    assert "sources" in data

def test_chat_with_empty_message(client):
    """Test chat with empty message."""
    response = client.post("/api/v1/chat/", json={"message": ""})
    assert response.status_code == 422  # Validation error