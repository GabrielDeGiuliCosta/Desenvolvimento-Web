import UserMenu from './UserMenu'

function UserPanel({ user, personagens, onOpenCharacter, onNewCharacter, onLogout }) {
  return (
    <>
      <header>
        <div className="logo">
          Colônia
          <span>Painel de personagens — {user?.name}</span>
        </div>

        <nav className="header-actions" aria-label="Ações do painel de usuário">
          <UserMenu
            user={user}
            onPanel={() => {}}
            onNewCharacter={onNewCharacter}
            onExport={() => window.exportarFichas?.()}
            onImport={() => window.importarFichas?.()}
            onLogout={onLogout}
            showPanelOption={false}
          />
        </nav>
      </header>

      <main className="main">
        <section className="panel-title" aria-labelledby="panel-heading">
          <div>
            <div className="section-label">Personagens</div>
            <h1 id="panel-heading">Suas fichas salvas</h1>
          </div>
        </section>

        {personagens.length === 0 ? (
          <section className="empty-state" aria-labelledby="empty-characters-heading">
            <h2 id="empty-characters-heading">Nenhum Personagem</h2>
            <p>Clique em <strong>Novo Personagem</strong> para criar sua primeira ficha.</p>
          </section>
        ) : (
          <section className="character-grid" aria-label="Lista de personagens salvos">
            {personagens.map((ficha) => (
              <article
                className="character-card"
                key={ficha.id}
                aria-labelledby={`character-${ficha.id}-title`}
              >
                <div className="character-card-header">
                  <h2 id={`character-${ficha.id}-title`}>{ficha.nome || 'Sem Nome'}</h2>
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

                <button
                  className="btn primary"
                  type="button"
                  onClick={() => onOpenCharacter(ficha.id)}
                  aria-label={`Abrir ficha de ${ficha.nome || 'personagem sem nome'}`}
                >
                  Abrir Ficha
                </button>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default UserPanel