"""Tests for health endpoints."""

def test_health_check(client):
    """Test health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_status(client):
    """Test status endpoint."""
    response = client.get("/api/v1/status")
    assert response.status_code == 200
    assert response.json()["status"] == "running"

def test_root(client):
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()