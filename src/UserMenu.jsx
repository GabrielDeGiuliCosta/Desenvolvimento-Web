import { useState } from 'react'

function UserMenu({
  user,
  onPanel,
  onNewCharacter,
  onExport,
  onImport,
  onLogout,
  showPanelOption = true
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="user-menu">
      <button className="user-menu-button" type="button" onClick={() => setOpen(!open)}>
        {user?.name || 'Usuário'} ▾
      </button>

      {open && (
        <div className="user-menu-dropdown">
          {showPanelOption && (
            <button type="button" onClick={onPanel}>
              Voltar ao Painel
            </button>
          )}

          <button type="button" onClick={onNewCharacter}>
            Nova Ficha
          </button>
          <button type="button" onClick={onExport}>
            Exportar JSON
          </button>
          <button type="button" onClick={onImport}>
            Importar JSON
          </button>
          <button className="danger" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu