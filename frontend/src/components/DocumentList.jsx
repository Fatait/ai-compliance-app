import React, { useState, useEffect } from 'react'
import api from '../services/api'

function DocumentList() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadDocuments()
  }, [filter])

  const loadDocuments = async () => {
    setLoading(true)
    try {
      const response = await api.getDocuments(filter === 'all' ? null : filter)
      setDocuments(response.data.documents)
    } catch (error) {
      console.error('Error loading documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (docId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document?')) return

    try {
      await api.deleteDocument(docId)
      loadDocuments()
    } catch (error) {
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📁 Mes Documents</h2>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">Tous</option>
            <option value="offer">Offres</option>
            <option value="regulation">Règlements</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun document trouvé
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{doc.title}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded text-xs ${
                      doc.type === 'offer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {doc.type === 'offer' ? 'Offre' : 'Règlement'}
                    </span>
                    <span>{new Date(doc.upload_date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  🗑️ Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentList