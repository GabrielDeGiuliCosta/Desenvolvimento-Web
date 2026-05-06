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
      <button className="user-menu-button" onClick={() => setOpen(!open)}>
        {user?.name || 'Usuário'} ▾
      </button>

      {open && (
        <div className="user-menu-dropdown">
          {showPanelOption && (
            <button onClick={onPanel}>Voltar ao Painel</button>
          )}

          <button onClick={onNewCharacter}>Nova Ficha</button>
          <button onClick={onExport}>Exportar JSON</button>
          <button onClick={onImport}>Importar JSON</button>
          <button className="danger" onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default UserMenu