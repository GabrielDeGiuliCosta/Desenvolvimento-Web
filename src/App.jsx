import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const scriptId = 'legacy-app-script'

    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.id = scriptId
    script.src = '/legacy-app.js'
    script.async = false

    document.body.appendChild(script)
  }, [])

  function criarNovaFicha() {
    if (window.novaFicha) {
      window.novaFicha()
    }
  }

  function exportar() {
    if (window.exportarFichas) {
      window.exportarFichas()
    }
  }

  function importar() {
    if (window.importarFichas) {
      window.importarFichas()
    }
  }

  function lerArquivoImportado(e) {
    if (window.lerImportacao) {
      window.lerImportacao(e)
    }
  }

  return (
    <>
      <header>
        <div className="logo">
          Colônia
          <span>Ficha de Protagonista</span>
        </div>

        <div className="header-actions">
          <button className="btn primary" onClick={criarNovaFicha}>
            Nova Ficha
          </button>

          <button className="btn" onClick={exportar}>
            Exportar
          </button>

          <button className="btn" onClick={importar}>
            Importar
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