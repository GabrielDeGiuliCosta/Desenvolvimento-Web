const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function getToken() {
  return localStorage.getItem('token')
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null')
}

export function getFichasStorageKey() {
  const user = getUser()

  if (user?.id) {
    return `colonia_fichas_user_${user.id}`
  }

  return 'colonia_fichas_guest'
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export async function apiRequest(path, options = {}) {
  const token = getToken()

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Erro na requisição.')
  }

  return data
}

export async function registerUser(name, email, password) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  })
}

export async function loginUser(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

export async function getMe() {
  return apiRequest('/auth/me')
}

export async function getSheets() {
  return apiRequest('/sheets')
}

export async function createSheet(title, data) {
  return apiRequest('/sheets', {
    method: 'POST',
    body: JSON.stringify({ title, data })
  })
}

export async function deleteSheet(id) {
  return apiRequest(`/sheets/${id}`, {
    method: 'DELETE'
  })
}

export async function syncSheet(sheet) {
  return apiRequest('/sheets/sync', {
    method: 'POST',
    body: JSON.stringify({
      localId: String(sheet.id),
      title: sheet.nome || sheet.name || 'Ficha sem nome',
      data: sheet
    })
  })
}