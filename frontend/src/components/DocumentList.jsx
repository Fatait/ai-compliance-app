import React, { useState, useEffect } from 'react'
import { FolderOpen, Trash2, FileText, Shield, Calendar, Loader2 } from 'lucide-react'
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
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Mes Documents</h2>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white transition"
          >
            <option value="all">Tous les documents</option>
            <option value="offer">Documents</option>
            <option value="regulation">Règlements</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-blue-600 mx-auto animate-spin" />
            <p className="mt-4 text-gray-600">Chargement des documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun document trouvé</p>
            <p className="text-gray-400 text-sm mt-2">
              Téléchargez vos premiers documents pour commencer
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all bg-white group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${
                    doc.type === 'offer' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                  }`}>
                    {doc.type === 'offer' ? (
                      <FileText className="w-5 h-5 text-green-600" />
                    ) : (
                      <Shield className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{doc.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        doc.type === 'offer' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {doc.type === 'offer' ? 'Document' : 'Règlement'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(doc.upload_date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
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