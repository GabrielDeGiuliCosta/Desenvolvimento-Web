import { useState } from 'react'
import { loginUser, registerUser, setToken } from './services/api'

function AuthHome({ onGuest, onLoginSuccess }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    try {
      const data =
        mode === 'register'
          ? await registerUser(name, email, password)
          : await loginUser(email, password)

      setToken(data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      await onLoginSuccess()
    } catch (error) {
      setErro(error.message)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <h1 id="auth-title">Colônia</h1>
        <p>Entre na sua conta para salvar suas fichas online.</p>

        <div className="auth-tabs" role="tablist" aria-label="Opções de autenticação">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Login
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mode === 'register'}
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Cadastro
          </button>
        </div>

        <form onSubmit={handleSubmit} aria-describedby="guest-warning">
          {mode === 'register' && (
            <div className="auth-field">
              <label htmlFor="auth-name">Nome</label>
              <input
                id="auth-name"
                type="text"
                placeholder="Nome"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Senha</label>
            <input
              id="auth-password"
              type="password"
              placeholder="Senha"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {erro && (
            <div className="auth-error" role="alert" aria-live="polite">
              {erro}
            </div>
          )}

          <button
            className="btn primary"
            type="submit"
            aria-label={mode === 'register' ? 'Criar nova conta' : 'Entrar na conta'}
          >
            {mode === 'register' ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>

        <button
          className="btn"
          type="button"
          onClick={onGuest}
          aria-label="Continuar sem login usando salvamento local"
        >
          Continuar sem login
        </button>

        <div id="guest-warning" className="guest-warning">
          Sem login, suas fichas serão salvas apenas neste navegador usando localStorage. Para guardar fora do navegador, use a exportação JSON. Também não terá acesso ao painel de usuário e outras funcionalidades.
        </div>
        <footer className="auth-footer">
          <p>
            Este projeto foi desenvolvido exclusivamente para fins acadêmicos.
          </p>

          <p>
            O projeto não possui qualquer afiliação oficial com o autor,
            publicadora ou detentores da propriedade intelectual do sistema
            Colônia RPG.
          </p>
        </footer>
      </section>
    </main>
  )
}

export default AuthHome