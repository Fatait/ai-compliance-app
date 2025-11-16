import React, { useState } from 'react'
import Chatbot from './components/Chatbot'
import DocumentUpload from './components/DocumentUpload'
import ComplianceAnalysis from './components/ComplianceAnalysis'
import DocumentList from './components/DocumentList'

function App() {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">🤖 AI Compliance Assistant</h1>
          <p className="text-blue-100 mt-2">
            Analysez vos documents et vérifiez la conformité
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 py-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💬 Chatbot
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📤 Upload
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'documents'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📁 Documents
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'compliance'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✅ Analyse
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'chat' && <Chatbot />}
        {activeTab === 'upload' && <DocumentUpload />}
        {activeTab === 'documents' && <DocumentList />}
        {activeTab === 'compliance' && <ComplianceAnalysis />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>© 2025 AI Compliance App - Powered by FastAPI & React</p>
        </div>
      </footer>
    </div>
  )
}

export default App
