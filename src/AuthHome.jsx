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
    <div className="auth-page">
      <div className="auth-card">
        <h1>Colônia</h1>
        <p>Entre na sua conta para salvar suas fichas online.</p>

        <div className="auth-tabs">
          <button
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Login
          </button>

          <button
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Cadastro
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {erro && <div className="auth-error">{erro}</div>}

          <button className="btn primary" type="submit">
            {mode === 'register' ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>

        <button className="btn" onClick={onGuest}>
          Continuar sem login
        </button>

        <div className="guest-warning">
          Sem login, suas fichas serão salvas apenas neste navegador usando localStorage. Para guardar fora do navegador, use a exportação JSON. Também não terá acesso ao painel de usuário e outras funcionalidades.
        </div>
      </div>
    </div>
  )
}

export default AuthHome