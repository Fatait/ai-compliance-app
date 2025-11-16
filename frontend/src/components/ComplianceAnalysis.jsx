import React, { useState, useEffect } from 'react'
import api from '../services/api'

function ComplianceAnalysis() {
  const [documents, setDocuments] = useState([])
  const [regulations, setRegulations] = useState([])
  const [selectedDoc, setSelectedDoc] = useState('')
  const [selectedReg, setSelectedReg] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const [docsRes, regsRes] = await Promise.all([
        api.getDocuments('offer'),
        api.getDocuments('regulation')
      ])
      setDocuments(docsRes.data.documents)
      setRegulations(regsRes.data.documents)
    } catch (error) {
      console.error('Error loading documents:', error)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedDoc || !selectedReg) {
      alert('Veuillez sélectionner un document et un règlement')
      return
    }

    setAnalyzing(true)
    setResult(null)

    try {
      const response = await api.analyzeCompliance(selectedDoc, selectedReg)
      setResult(response.data)
    } catch (error) {
      alert('Erreur lors de l\'analyse')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">✅ Analyse de Conformité</h2>

        <div className="space-y-4 mb-6">
          {/* Document selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document à analyser
            </label>
            <select
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Sélectionner un document</option>
              {documents.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.title}</option>
              ))}
            </select>
          </div>

          {/* Regulation selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Règlement de référence
            </label>
            <select
              value={selectedReg}
              onChange={(e) => setSelectedReg(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Sélectionner un règlement</option>
              {regulations.map(reg => (
                <option key={reg.id} value={reg.id}>{reg.title}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
          >
            {analyzing ? 'Analyse en cours...' : 'Analyser la conformité'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Résultats</h3>
              <span className={`px-4 py-2 rounded-lg font-medium ${
                result.compliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {result.compliant ? '✅ Conforme' : '❌ Non conforme'}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Score de conformité</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    result.score > 0.75 ? 'bg-green-500' : result.score > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.score * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">
                {(result.score * 100).toFixed(1)}%
              </p>
            </div>

            {result.issues.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-red-800 mb-2">Problèmes détectés:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {result.issues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Recommandations:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ComplianceAnalysis