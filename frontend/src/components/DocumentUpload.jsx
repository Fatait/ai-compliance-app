import React, { useState } from 'react'
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import api from '../services/api'

function DocumentUpload() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [docType, setDocType] = useState('offer')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    if (selectedFile && !title) {
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''))
    }
  }

  const handleUpload = async () => {
    if (!file || !title) {
      setMessage({ text: 'Veuillez remplir tous les champs', type: 'error' })
      return
    }

    setUploading(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await api.uploadDocument(file, title, docType)
      setMessage({ text: response.data.message, type: 'success' })
      setFile(null)
      setTitle('')
      // Reset file input
      document.getElementById('file-input').value = ''
      setTimeout(() => setMessage({ text: '', type: '' }), 5000)
    } catch (error) {
      setMessage({ text: 'Erreur lors du téléchargement', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Télécharger un document</h2>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre du document
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              placeholder="Ex: Règlement général 2024"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de document
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDocType('offer')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  docType === 'offer'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className={`w-6 h-6 mx-auto mb-2 ${
                  docType === 'offer' ? 'text-green-600' : 'text-gray-400'
                }`} />
                <p className={`text-sm font-medium ${
                  docType === 'offer' ? 'text-green-900' : 'text-gray-600'
                }`}>
                  Document
                </p>
              </button>
              <button
                type="button"
                onClick={() => setDocType('regulation')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  docType === 'regulation'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className={`w-6 h-6 mx-auto mb-2 ${
                  docType === 'regulation' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <p className={`text-sm font-medium ${
                  docType === 'regulation' ? 'text-blue-900' : 'text-gray-600'
                }`}>
                  Règlement
                </p>
              </button>
            </div>
          </div>

          {/* File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fichier (PDF ou TXT)
            </label>
            <div className="relative">
              <input
                id="file-input"
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {file && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <FileText className="w-4 h-4" />
                <span className="truncate">{file.name}</span>
                <span className="text-gray-400">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            )}
          </div>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={uploading || !file || !title}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Téléchargement en cours...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Télécharger le document
              </>
            )}
          </button>

          {/* Message */}
          {message.text && (
            <div className={`p-4 rounded-lg flex items-start gap-3 animate-slideIn ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentUpload