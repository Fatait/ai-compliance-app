import React, { useState } from 'react'
import { MessageSquare, Upload, FolderOpen, CheckCircle, Bot } from 'lucide-react'
import Chatbot from './components/Chatbot'
import DocumentUpload from './components/DocumentUpload'
import ComplianceAnalysis from './components/ComplianceAnalysis'
import DocumentList from './components/DocumentList'

function App() {
  const [activeTab, setActiveTab] = useState('chat')

  const tabs = [
    { id: 'chat', label: 'Chatbot', icon: MessageSquare },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'compliance', label: 'Analyse', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">AI Compliance Assistant</h1>
              <p className="text-blue-100 mt-1">
                Analysez vos documents et vérifiez la conformité
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-2 py-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fadeIn">
          {activeTab === 'chat' && <Chatbot />}
          {activeTab === 'upload' && <DocumentUpload />}
          {activeTab === 'documents' && <DocumentList />}
          {activeTab === 'compliance' && <ComplianceAnalysis />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-300">© 2025 AI Compliance App</p>
        </div>
      </footer>
    </div>
  )
}

export default App