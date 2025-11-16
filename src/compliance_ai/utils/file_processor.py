# ============================================
# FILE: src/compliance_ai/utils/file_processor.py
# ============================================
from pypdf import PdfReader
from typing import Optional
import os

class FileProcessor:
    @staticmethod
    def extract_text_from_pdf(file_path: str) -> Optional[str]:
        """Extract text from PDF file."""
        try:
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            return text
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return None
    
    @staticmethod
    def extract_text_from_txt(file_path: str) -> Optional[str]:
        """Extract text from TXT file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            print(f"Error reading TXT: {e}")
            return None
    
    @staticmethod
    def process_file(file_path: str) -> Optional[str]:
        """Process file based on extension."""
        ext = os.path.splitext(file_path)[1].lower()
        if ext == '.pdf':
            return FileProcessor.extract_text_from_pdf(file_path)
        elif ext == '.txt':
            return FileProcessor.extract_text_from_txt(file_path)
        return None

file_processor = FileProcessor()
