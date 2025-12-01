"""Tests for compliance endpoints."""


def test_analyze_compliance(authenticated_client, sample_compliance_request):
    """Test compliance analysis endpoint."""
    response = authenticated_client.post("/api/v1/compliance/analyze", json=sample_compliance_request)
    assert response.status_code == 200
    data = response.json()
    assert "compliant" in data
    assert "score" in data
    assert "issues" in data
    assert "recommendations" in data


def test_list_reports(authenticated_client):
    """Test list reports endpoint."""
    response = authenticated_client.get("/api/v1/compliance/reports")
    assert response.status_code == 200
