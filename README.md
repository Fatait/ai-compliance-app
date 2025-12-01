# 🤖 AI Compliance App

An AI-powered application for compliance analysis using RAG (Retrieval-Augmented Generation).

## 🚀 Quick Start

### Clone Repo

```bash
git clone https://github.com/Fatait/ai-compliance-app.git
cd ai-compliance-app
```

### 1. Install UV (if not installed)

**Mac/Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows:**
```bash
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2. Setup Backend

```bash
# Create virtual environment
uv venv -p 3.12 .venv

# Activate virtual environment
source .venv/bin/activate  # Mac/Linux
.venv\Scripts\activate     # Windows

# Copy .env example
cp .env.example .env  # Mac/Linux
copy .env.example .env # Windows

# Install dependencies
uv pip install -e .

# Setup vector database
python scripts/setup_vector_db.py

# Ingest sample documents
python scripts/ingest_documents.py

# Run the API server
uvicorn compliance_ai.main:app --reload
```

The API will be available at: http://localhost:8000
API docs: http://localhost:8000/docs

### 3. Setup Frontend

```bash
# Go to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: http://localhost:5173

## 📁 Project Structure

```
ai_compliance_app/
├── src/compliance_ai/          # Backend Python code
│   ├── main.py                 # FastAPI application
│   ├── api/routes/             # API endpoints
│   ├── services/               # Business logic
│   ├── database/               # Vector database
│   └── models/                 # Pydantic models
├── frontend/                   # React frontend
│   └── src/
│       ├── components/         # React components
│       └── services/           # API client
├── data/                       # Documents storage
├── scripts/                    # Utility scripts
└── tests/                      # Tests
```

## 🎯 Features

- **💬 Chatbot**: Ask questions about regulations and compliance
- **📤 Document Upload**: Upload PDF or TXT documents
- **📁 Document Management**: List and manage documents
- **✅ Compliance Analysis**: Check if documents comply with regulations

## 🛠️ Tech Stack

### Backend
- Python 3.11+
- FastAPI + Uvicorn
- Hugging Face Transformers
- ChromaDB (Vector Database)
- Pydantic

### Frontend
- React 18
- Tailwind CSS
- Vite
- Axios

## 📝 API Endpoints

### Health
- `GET /health` - Health check
- `GET /api/v1/status` - System status

### Chat
- `POST /api/v1/chat/` - Send message to chatbot

### Documents
- `POST /api/v1/documents/upload` - Upload document
- `GET /api/v1/documents/` - List documents
- `DELETE /api/v1/documents/{id}` - Delete document

### Compliance
- `POST /api/v1/compliance/analyze` - Analyze compliance

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=compliance_ai

# Format code
black src/ tests/
```

## Chunks
Chunks are available on `data/vectore_db/iso9001_chunks.json`

## 🐛 Troubleshooting

### Port 8000 already in use
```bash
# Use different port
uvicorn compliance_ai.main:app --reload --port 8001
```

### Module not found
```bash
# Make sure virtual environment is activated
source .venv/bin/activate
```

### Frontend can't connect to backend
- Make sure backend is running on port 8000
- Check CORS settings in `.env`

## 📚 Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ChromaDB](https://docs.trychroma.com/)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.

---

