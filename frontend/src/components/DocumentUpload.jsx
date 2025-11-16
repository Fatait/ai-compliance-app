import React, { useState } from 'react'
import api from '../services/api'

function DocumentUpload() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [docType, setDocType] = useState('offer')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpload = async () => {
    if (!file || !title) {
      setMessage('Veuillez remplir tous les champs')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const response = await api.uploadDocument(file, title, docType)
      setMessage('✅ ' + response.data.message)
      setFile(null)
      setTitle('')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ Erreur lors du téléchargement')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">📤 Télécharger un document</h2>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre du document
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Ex: Règlement général 2024"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de document
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="offer">Offre</option>
              <option value="regulation">Règlement</option>
            </select>
          </div>

          {/* File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fichier (PDF ou TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
          >
            {uploading ? 'Téléchargement...' : 'Télécharger'}
          </button>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentUpload