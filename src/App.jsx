import { useEffect, useRef, useState } from 'react'
import AuthHome from './AuthHome'
import UserPanel from './UserPanel'
import UserMenu from './UserMenu'
import { getSheets, getToken, removeToken, syncSheet, deleteSheet } from './services/api'

function App() {
  const [authChecked, setAuthChecked] = useState(false)
  const [modoApp, setModoApp] = useState(null)
  const [temaEscuro, setTemaEscuro] = useState(() => {
    return localStorage.getItem('colonia_theme') === 'dark'
  })
  const [configOpen, setConfigOpen] = useState(false)
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
    if (modoApp !== 'app') return

    let cancelado = false

    async function executar() {
      await carregarLegacyApp()

      if (cancelado) return

      const action = pendingActionRef.current
      if (!action) return

      if (action.type === 'new') {
        window.novaFicha?.()
      }

      if (action.type === 'open') {
        window.abrirFichaPorId?.(action.id)
      }

      pendingActionRef.current = null
    }

    executar()

    return () => {
      cancelado = true
    }
  }, [modoApp])

  useEffect(() => {
    if (temaEscuro) {
      document.body.classList.add('dark-theme')
      localStorage.setItem('colonia_theme', 'dark')
    } else {
      document.body.classList.remove('dark-theme')
      localStorage.setItem('colonia_theme', 'light')
    }
  }, [temaEscuro])

  useEffect(() => {
    window.syncFichaComBackend = async function (ficha) {
      const token = localStorage.getItem('token')
      const guestMode = localStorage.getItem('guestMode') === 'true'

      if (!token || guestMode || !ficha) return

      try {
        const sheetSalva = await syncSheet(ficha)

        ficha._backendId = sheetSalva.id
        ficha._localId = sheetSalva.localId

        const user = JSON.parse(localStorage.getItem('user') || 'null')
        const fichas = JSON.parse(localStorage.getItem('colonia_fichas') || '[]')

        const fichasAtualizadas = fichas.map(f => {
          if (String(f.id) === String(ficha.id)) {
            return {
              ...f,
              _backendId: sheetSalva.id,
              _localId: sheetSalva.localId
            }
          }

          return f
        })

        localStorage.setItem('colonia_fichas', JSON.stringify(fichasAtualizadas))

        if (user?.id) {
          localStorage.setItem(
            `colonia_fichas_user_${user.id}`,
            JSON.stringify(fichasAtualizadas)
          )
        }

        console.log('Ficha sincronizada:', ficha.nome || ficha.id)
      } catch (error) {
        console.error('Erro ao sincronizar ficha:', error)
      }
    }

    window.deleteFichaBackend = async function (idParaDeletar) {
      const token = localStorage.getItem('token')
      const guestMode = localStorage.getItem('guestMode') === 'true'

      if (!token || guestMode) return true

      try {
        await deleteSheet(String(idParaDeletar))
        console.log('Ficha deletada no backend:', idParaDeletar)
        return true
      } catch (error) {
        console.error('Erro ao deletar ficha no backend:', error)
        return false
      }
    }

    return () => {
      delete window.syncFichaComBackend
      delete window.deleteFichaBackend
    }
  }, [])

  function carregarLegacyApp() {
    const scriptId = 'legacy-app-script'
    const existente = document.getElementById(scriptId)

    if (existente) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = '/legacy-app.js'
      script.async = false
      script.onload = resolve
      script.onerror = reject

      document.body.appendChild(script)
    })
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

    const fichas = sheets.map(sheet => ({
      ...sheet.data,
      _backendId: sheet.id,
      _localId: sheet.localId
    }))

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

  function alternarTema() {
    setTemaEscuro(v => !v)
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

  function importarJsonNoPainel() {
    const input = document.getElementById('panelImportInput')

    if (input) {
      input.value = ''
      input.click()
    }
  }

  function fichaValida(ficha) {
    if (!ficha || typeof ficha !== 'object' || Array.isArray(ficha)) {
      return false
    }

    const camposMinimos = [
      'nome',
      'nivel',
      'fisico',
      'esperteza',
      'sagacidade'
    ]

    return camposMinimos.some(campo => campo in ficha)
  }

  async function lerImportacaoPainel(e) {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      const texto = await file.text()
      const json = JSON.parse(texto)

      let fichasImportadas = []

      if (Array.isArray(json)) {
        fichasImportadas = json
      } else if (Array.isArray(json.fichas)) {
        fichasImportadas = json.fichas
      } else {
        fichasImportadas = [json]
      }

      const fichasValidas = fichasImportadas.filter(fichaValida)

      if (fichasValidas.length === 0) {
        alert('O arquivo JSON importado não possui um formato válido de ficha.')
        return
      }

      const fichasAtuais = JSON.parse(localStorage.getItem('colonia_fichas') || '[]')

      const novasFichas = fichasValidas.map((ficha, index) => ({
        ...ficha,
        id: Date.now() + index,
        nome: ficha.nome || 'Ficha Importada'
      }))

      const fichasAtualizadas = [...fichasAtuais, ...novasFichas]

      localStorage.setItem('colonia_fichas', JSON.stringify(fichasAtualizadas))

      const user = JSON.parse(localStorage.getItem('user') || 'null')

      if (user?.id) {
        localStorage.setItem(
          `colonia_fichas_user_${user.id}`,
          JSON.stringify(fichasAtualizadas)
        )
      }

      for (const ficha of novasFichas) {
        await syncSheet(ficha)
      }

      setPersonagens(fichasAtualizadas)

      alert(
        novasFichas.length === 1
          ? 'Ficha importada com sucesso.'
          : `${novasFichas.length} fichas importadas com sucesso.`
      )
    } catch (error) {
      console.error(error)
      alert('Não foi possível importar o arquivo. Verifique se ele é um JSON válido.')
    }
  }

  function voltarPainel() {
    const fichas = JSON.parse(localStorage.getItem('colonia_fichas') || '[]')
    setPersonagens(fichas)
    setModoApp('panel')
  }

  if (!authChecked) {
    return (
      <main className="auth-page" aria-live="polite">
        Carregando...
      </main>
    )
  }

  if (modoApp === 'panel') {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    return (
      <>
      <UserPanel
        user={user}
        personagens={personagens}
        onOpenCharacter={abrirFicha}
        onNewCharacter={criarPersonagemLogado}
        onImport={importarJsonNoPainel}
        onLogout={sair}
      />

      <button
        className="theme-floating-button"
        type="button"
        onClick={alternarTema}
        aria-label="Alternar tema claro e escuro"
      >
        {temaEscuro ? '☾' : '☀'}
      </button>

      <input
        id="panelImportInput"
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={lerImportacaoPainel}
      />
    </>
    )
  }

  if (modoApp !== 'app') {
    return (
      <>
        <AuthHome
          onGuest={iniciarComoConvidado}
          onLoginSuccess={iniciarComoLogado}
        />

        <button
          className="theme-floating-button"
          type="button"
          onClick={alternarTema}
          aria-label="Alternar tema claro e escuro"
        >
          {temaEscuro ? '☾' : '☀'}
        </button>
      </>
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

        <nav className="header-actions" aria-label="Ações da ficha">
          {isGuest && (
            <>
              <button
                className="btn primary"
                type="button"
                onClick={criarNovaFicha}
                aria-label="Criar nova ficha local"
              >
                Nova Ficha
              </button>

              <button
                className="btn"
                type="button"
                onClick={exportar}
                aria-label="Exportar fichas em JSON"
              >
                Exportar JSON
              </button>

              <button
                className="btn"
                type="button"
                onClick={importar}
                aria-label="Importar fichas de um arquivo JSON"
              >
                Importar JSON
              </button>

              <button
                className="btn"
                type="button"
                onClick={() => setConfigOpen(true)}
                aria-label="Abrir configurações"
              >
                Configurações
              </button>

              <button
                className="btn danger"
                type="button"
                onClick={sair}
                aria-label="Sair do modo convidado"
              >
                Sair
              </button>
            </>
          )}

          {!isGuest && (
            <>
              <button
                className="btn"
                type="button"
                onClick={voltarPainel}
                aria-label="Voltar para o painel de personagens"
              >
                Painel
              </button>

              <UserMenu
                user={user}
                onPanel={voltarPainel}
                onNewCharacter={criarPersonagemLogado}
                onExport={exportar}
                onImport={importar}
                onOpenSettings={() => setConfigOpen(true)}
                onLogout={sair}
                showPanelOption={false}
              />
            </>
          )}
        </nav>
      </header>

      {isGuest ? (
        <div
          className="tabs-bar"
          id="tabsBar"
          role="navigation"
          aria-label="Fichas abertas"
        ></div>
      ) : (
        <div id="tabsBar" hidden></div>
      )}

      <main className="main" id="mainContent" aria-live="polite"></main>

      <input
        id="importInput"
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={lerArquivoImportado}
        aria-label="Selecionar arquivo JSON para importar fichas"
      />

      <button
        className="theme-floating-button"
        type="button"
        onClick={alternarTema}
        aria-label="Alternar tema claro e escuro"
      >
        {temaEscuro ? '☾' : '☀'}
      </button>

      <div className={`settings-modal ${configOpen ? '' : 'hidden'}`}>
        <div className="settings-box">
          <div className="section-label">Configurações</div>

          <button
            className="btn"
            type="button"
            onClick={alternarTema}
          >
            {temaEscuro ? 'Modo Claro ☀' : 'Modo Escuro ☾'}
          </button>

          <button
            className="btn danger"
            type="button"
            onClick={() => setConfigOpen(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    </>
  )
}

export default App