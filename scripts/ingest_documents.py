"""Script to ingest sample documents into the vector database."""

import sys
sys.path.insert(0, './src')

from compliance_ai.database.document_manager import document_manager

def ingest_sample_documents():
    """Ingest sample documents for testing."""
    
    # Sample regulation
    regulation_text = """
    Article 1: Dispositions générales
    Toute offre commerciale doit inclure les mentions légales obligatoires.
    
    Article 2: Prix et conditions
    Le prix doit être indiqué en toutes lettres et en chiffres, TTC.
    
    Article 3: Garanties
    Une garantie minimale de 2 ans doit être proposée sur tous les produits.
    
    Article 4: Délai de rétractation
    Un délai de rétractation de 14 jours doit être mentionné.
    """
    
    # Sample offer
    offer_text = """
    OFFRE COMMERCIALE
    
    Produit: Ordinateur portable XYZ
    Prix: 999€ TTC (neuf cent quatre-vingt-dix-neuf euros)
    
    Garantie: 2 ans constructeur
    Délai de livraison: 3-5 jours ouvrés
    
    Vous disposez d'un délai de rétractation de 14 jours.
    
    Mentions légales:
    Société ABC - SIRET: 123456789
    """
    
    print("📥 Ingesting sample documents...")
    
    # Add regulation
    reg_id = document_manager.add_document(
        title="Règlement Général Commerce 2024",
        content=regulation_text,
        doc_type="regulation"
    )
    print(f"✅ Regulation added: {reg_id}")
    
    # Add offer
    offer_id = document_manager.add_document(
        title="Offre Ordinateur Portable XYZ",
        content=offer_text,
        doc_type="offer"
    )
    print(f"✅ Offer added: {offer_id}")
    
    print("\n✨ Sample documents ingested successfully!")
    print("You can now use the chatbot and compliance analysis features.")

if __name__ == "__main__":
    ingest_sample_documents()