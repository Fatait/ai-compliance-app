"""Script to setup the vector database."""

import sys
sys.path.insert(0, './src')

from compliance_ai.database.vector_store import vector_store
import shutil
import os

def setup_vector_db(reset=False):
    """Setup or reset the vector database."""
    
    if reset:
        print("🗑️  Resetting vector database...")
        if os.path.exists('./data/vector_db'):
            shutil.rmtree('./data/vector_db')
        print("✅ Database reset complete")
    
    print("🔧 Setting up vector database...")
    # Just initialize (will create if doesn't exist)
    _ = vector_store
    print("✅ Vector database ready!")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--reset', action='store_true', help='Reset the database')
    args = parser.parse_args()
    
    setup_vector_db(reset=args.reset)