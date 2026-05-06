import { useEffect, useRef, useState } from 'react'
import AuthHome from './AuthHome'
import UserPanel from './UserPanel'
import { getSheets, getToken, removeToken, syncSheet, deleteSheet } from './services/api'

function App() {
  const [authChecked, setAuthChecked] = useState(false)
  const [modoApp, setModoApp] = useState(null)
  const [personagens, setPersonagens] = useState([])
  const pendingActionRef = useRef(null)

  useEffect(() => {
    const token = getToken()

    if (token) {
      iniciarComoLogado()
    } else {
      setAuthChecked(true)
    }
  }, [])

  useEffect(() => {
    if (modoApp === 'app') {
      carregarLegacyApp()

      setTimeout(() => {
        const action = pendingActionRef.current

        if (!action) return

        if (action.type === 'new') {
          window.novaFicha?.()
        }

        if (action.type === 'open') {
          window.abrirFichaPorId?.(action.id)
        }

        pendingActionRef.current = null
      }, 300)
    }
  }, [modoApp])

  useEffect(() => {
    window.syncFichaComBackend = async function (ficha) {
      const token = localStorage.getItem('token')
      const guestMode = localStorage.getItem('guestMode') === 'true'

      if (!token || guestMode || !ficha) return

      try {
        await syncSheet(ficha)
        console.log('Ficha sincronizada:', ficha.nome || ficha.id)
      } catch (error) {
        console.error('Erro ao sincronizar ficha:', error)
      }
    }

    window.deleteFichaBackend = async function (localId) {
      const token = localStorage.getItem('token')
      const guestMode = localStorage.getItem('guestMode') === 'true'

      if (!token || guestMode) return

      try {
        await deleteSheet(String(localId))
        console.log('Ficha deletada no backend:', localId)
      } catch (error) {
        console.error('Erro ao deletar ficha no backend:', error)
      }
    }

    return () => {
      delete window.syncFichaComBackend
      delete window.deleteFichaBackend
    }
  }, [])

  function carregarLegacyApp() {
    const scriptId = 'legacy-app-script'

    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.id = scriptId
    script.src = '/legacy-app.js'
    script.async = false

    document.body.appendChild(script)
  }

  async function iniciarComoLogado() {
    try {
      localStorage.removeItem('guestMode')
      localStorage.setItem('colonia_fichas', '[]')

      const fichas = await carregarFichasDoBancoParaLocalStorage()

      setPersonagens(fichas)
      setModoApp('panel')
    } catch (error) {
      console.error(error)
      removeToken()
      localStorage.removeItem('user')
      localStorage.setItem('colonia_fichas', '[]')
      setModoApp(null)
    } finally {
      setAuthChecked(true)
    }
  }

  function iniciarComoConvidado() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.setItem('guestMode', 'true')

    const guestFichas = localStorage.getItem('colonia_fichas_guest') || '[]'

    localStorage.setItem('colonia_fichas', guestFichas)

    setModoApp('app')
  }

  async function carregarFichasDoBancoParaLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    if (!user?.id) return []

    const sheets = await getSheets()
    const fichas = sheets.map(sheet => sheet.data)

    const userKey = `colonia_fichas_user_${user.id}`

    localStorage.setItem(userKey, JSON.stringify(fichas))
    localStorage.setItem('colonia_fichas', JSON.stringify(fichas))

    return fichas
  }

  function criarNovaFicha() {
    window.novaFicha?.()
  }

  function exportar() {
    window.exportarFichas?.()
  }

  function importar() {
    window.importarFichas?.()
  }

  function lerArquivoImportado(e) {
    window.lerImportacao?.(e)
  }

  function sair() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const fichasAtuais = localStorage.getItem('colonia_fichas') || '[]'

    if (user?.id) {
      localStorage.setItem(`colonia_fichas_user_${user.id}`, fichasAtuais)
    } else {
      localStorage.setItem('colonia_fichas_guest', fichasAtuais)
    }

    removeToken()
    localStorage.removeItem('user')
    localStorage.removeItem('guestMode')

    localStorage.setItem('colonia_fichas', '[]')

    window.location.reload()
  }

  function abrirFicha(id) {
    pendingActionRef.current = {
      type: 'open',
      id
    }

    localStorage.setItem('colonia_ficha_ativa', String(id))
    setModoApp('app')
  }

  function criarPersonagemLogado() {
    pendingActionRef.current = {
      type: 'new'
    }

    setModoApp('app')
  }

  function voltarPainel() {
    const fichas = JSON.parse(localStorage.getItem('colonia_fichas') || '[]')
    setPersonagens(fichas)
    setModoApp('panel')
  }

  if (!authChecked) {
    return <div className="auth-page">Carregando...</div>
  }

  if (modoApp === 'panel') {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    return (
      <UserPanel
        user={user}
        personagens={personagens}
        onOpenCharacter={abrirFicha}
        onNewCharacter={criarPersonagemLogado}
        onLogout={sair}
      />
    )
  }

  if (modoApp !== 'app') {
    return (
      <AuthHome
        onGuest={iniciarComoConvidado}
        onLoginSuccess={iniciarComoLogado}
      />
    )
  }

  const isGuest = localStorage.getItem('guestMode') === 'true'
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <>
      <header>
        <div className="logo">
          Colônia
          <span>
            {isGuest
              ? 'Modo convidado'
              : user
                ? `Logado como ${user.name}`
                : 'Ficha de Protagonista'}
          </span>
        </div>

        <div className="header-actions">
          {isGuest && (
            <span className="guest-header-warning">
              Salvando apenas localmente
            </span>
          )}

          {isGuest && (
            <button className="btn primary" onClick={criarNovaFicha}>
              Nova Ficha
            </button>
          )}

          <button className="btn" onClick={exportar}>
            Exportar JSON
          </button>

          <button className="btn" onClick={importar}>
            Importar JSON
          </button>

          {!isGuest && (
            <button className="btn" onClick={voltarPainel}>
              Painel
            </button>
          )}

          <button className="btn danger" onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      {isGuest && (
        <div className="tabs-bar" id="tabsBar"></div>
      )}

      {!isGuest && (
        <div id="tabsBar" style={{ display: 'none' }}></div>
      )}

      <main className="main" id="mainContent"></main>

      <input
        id="importInput"
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={lerArquivoImportado}
      />
    </>
  )
}

export default App