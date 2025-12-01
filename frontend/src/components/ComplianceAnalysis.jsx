import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertTriangle, FileText, Shield, TrendingUp } from 'lucide-react'
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
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Analyse de Conformité</h2>
        </div>

        <div className="space-y-4 mb-6">
          {/* Document selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Document à analyser
            </label>
            <select
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
            >
              <option value="">Sélectionner un document</option>
              {documents.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.title}</option>
              ))}
            </select>
          </div>

          {/* Regulation selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Shield className="w-4 h-4" />
              Règlement de référence
            </label>
            <select
              value={selectedReg}
              onChange={(e) => setSelectedReg(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
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
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Analyser la conformité
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 animate-slideIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Résultats</h3>
              <span className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm ${
                result.compliant 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {result.compliant ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Conforme
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    Non conforme
                  </>
                )}
              </span>
            </div>

            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Score de conformité</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(result.score * 100).toFixed(1)}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    result.score > 0.75 ? 'bg-green-500' : result.score > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.score * 100}%` }}
                ></div>
              </div>
            </div>

            {result.issues && result.issues.length > 0 && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Problèmes détectés
                </h4>
                <ul className="space-y-2">
                  {result.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-red-800">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Recommandations
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-blue-800">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
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