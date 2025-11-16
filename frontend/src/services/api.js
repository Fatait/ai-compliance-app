import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

const api = {
  // Chat
  chat: (message) => {
    return axios.post(`${API_BASE_URL}/api/v1/chat/`, {
      message: message
    })
  },

  // Documents
  uploadDocument: (file, title, docType) => {
    const formData = new FormData()
    formData.append('file', file)
    return axios.post(
      `${API_BASE_URL}/api/v1/documents/upload?title=${encodeURIComponent(title)}&doc_type=${docType}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },

  getDocuments: (docType) => {
    const params = docType ? `?doc_type=${docType}` : ''
    return axios.get(`${API_BASE_URL}/api/v1/documents/${params}`)
  },

  deleteDocument: (docId) => {
    return axios.delete(`${API_BASE_URL}/api/v1/documents/${docId}`)
  },

  // Compliance
  analyzeCompliance: (documentId, regulationId) => {
    return axios.post(`${API_BASE_URL}/api/v1/compliance/analyze`, {
      document_id: documentId,
      regulation_id: regulationId
    })
  }
}

export default api