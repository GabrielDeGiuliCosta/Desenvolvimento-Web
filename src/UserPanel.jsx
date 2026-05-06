import UserMenu from './UserMenu'

function UserPanel({ user, personagens, onOpenCharacter, onNewCharacter, onLogout }) {
  return (
    <>
      <header>
        <div className="logo">
          Colônia
          <span>Painel de personagens — {user?.name}</span>
        </div>

        <div className="header-actions">
          <UserMenu
            user={user}
            onPanel={() => {}}
            onNewCharacter={onNewCharacter}
            onExport={() => window.exportarFichas?.()}
            onImport={() => window.importarFichas?.()}
            onLogout={onLogout}
            showPanelOption={false}
          />
        </div>
      </header>

      <main className="main">
        <div className="panel-title">
          <div>
            <div className="section-label">Personagens</div>
            <h1>Suas fichas salvas</h1>
          </div>
        </div>

        {personagens.length === 0 ? (
          <div className="empty-state">
            <h2>Nenhum Personagem</h2>
            <p>Clique em <strong>Novo Personagem</strong> para criar sua primeira ficha.</p>
          </div>
        ) : (
          <div className="character-grid">
            {personagens.map((ficha) => (
              <div className="character-card" key={ficha.id}>
                <div className="character-card-header">
                  <h2>{ficha.nome || 'Sem Nome'}</h2>
                  <span>Nível {ficha.nivel || 1}</span>
                </div>

                <div className="character-card-info">
                  <div>
                    <strong>Arquétipo</strong>
                    <span>{ficha.arquetipos || ficha.arquetipo1 || '—'}</span>
                  </div>

                  <div>
                    <strong>Ocupação</strong>
                    <span>{ficha.ocupacoes || ficha.ocupacao1 || '—'}</span>
                  </div>
                </div>

                <button className="btn primary" onClick={() => onOpenCharacter(ficha.id)}>
                  Abrir Ficha
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default UserPanel