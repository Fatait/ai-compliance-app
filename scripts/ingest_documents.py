"""Script to ingest sample documents into the vector database."""

import sys
sys.path.insert(0, './src')

import json
from compliance_ai.database.document_manager import document_manager

def ingest_iso9001_documents():
    """Ingest ISO 9001 documents from JSON file."""
    print("📥 Ingesting ISO 9001 documents...")
    
    with open('data/iso9001_chunks.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for doc in data['documents']:
        doc_id = document_manager.add_document(
            title=doc['title'],
            content=doc['content'],
            doc_type="regulation"  # You can adjust the doc_type as needed
        )
        print(f"✅ ISO 9001 document added: {doc_id} - {doc['title']}")
        
    print("\n✨ ISO 9001 documents ingested successfully!")

    print("You can now use the chatbot and compliance analysis features.")

if __name__ == "__main__":
    ingest_iso9001_documents()