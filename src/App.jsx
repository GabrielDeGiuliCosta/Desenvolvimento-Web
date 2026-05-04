import { useEffect, useState } from 'react'
import AuthHome from './AuthHome'
import { createSheet, getSheets, getToken, removeToken, syncSheet } from './services/api'

function App() {
  const [authChecked, setAuthChecked] = useState(false)
  const [modoApp, setModoApp] = useState(null)

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

    return () => {
      delete window.syncFichaComBackend
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
      await sincronizarFichasLocaisComBanco()
      await carregarFichasDoBancoParaLocalStorage()

      setModoApp('app')
    } catch (error) {
      console.error(error)
      removeToken()
      localStorage.removeItem('user')
      setModoApp(null)
    } finally {
      setAuthChecked(true)
    }
  }

  function iniciarComoConvidado() {
    localStorage.setItem('guestMode', 'true')
    setModoApp('app')
  }

  async function sincronizarFichasLocaisComBanco() {
    const local = JSON.parse(localStorage.getItem('colonia_fichas') || '[]')

    if (!Array.isArray(local) || local.length === 0) return

    const fichasBanco = await getSheets()

    for (const ficha of local) {
      const jaExiste = fichasBanco.some(sheet => {
        return sheet.data?.id === ficha.id
      })

      if (!jaExiste) {
        await createSheet(ficha.nome || 'Ficha sem nome', ficha)
      }
    }
  }

  async function carregarFichasDoBancoParaLocalStorage() {
    const sheets = await getSheets()

    const fichas = sheets.map(sheet => sheet.data)

    localStorage.setItem('colonia_fichas', JSON.stringify(fichas))
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
    removeToken()
    localStorage.removeItem('user')
    localStorage.removeItem('guestMode')
    window.location.reload()
  }

  if (!authChecked) {
    return <div className="auth-page">Carregando...</div>
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

          <button className="btn primary" onClick={criarNovaFicha}>
            Nova Ficha
          </button>

          <button className="btn" onClick={exportar}>
            Exportar JSON
          </button>

          <button className="btn" onClick={importar}>
            Importar JSON
          </button>

          <button className="btn danger" onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      <div className="tabs-bar" id="tabsBar"></div>

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