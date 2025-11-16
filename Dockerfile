FROM python:3.11-slim

WORKDIR /app

# Install UV
RUN pip install uv

# Copy project files
COPY pyproject.toml .
COPY src/ src/

# Install dependencies
RUN uv pip install --system -e .

# Create data directories
RUN mkdir -p data/vector_db data/raw data/processed

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "compliance_ai.main:app", "--host", "0.0.0.0", "--port", "8000"]