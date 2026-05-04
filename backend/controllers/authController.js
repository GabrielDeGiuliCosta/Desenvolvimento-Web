const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')

function gerarToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

function limparUsuario(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Nome, email e senha são obrigatórios.'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'A senha deve ter pelo menos 6 caracteres.'
      })
    }

    const emailNormalizado = email.toLowerCase().trim()

    const userExists = await prisma.user.findUnique({
      where: {
        email: emailNormalizado
      }
    })

    if (userExists) {
      return res.status(409).json({
        message: 'Este email já está cadastrado.'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: emailNormalizado,
        password: passwordHash
      }
    })

    const token = gerarToken(user.id)

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      user: limparUsuario(user),
      token
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno ao cadastrar usuário.'
    })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email e senha são obrigatórios.'
      })
    }

    const emailNormalizado = email.toLowerCase().trim()

    const user = await prisma.user.findUnique({
      where: {
        email: emailNormalizado
      }
    })

    if (!user) {
      return res.status(401).json({
        message: 'Email ou senha inválidos.'
      })
    }

    const passwordIsValid = await bcrypt.compare(password, user.password)

    if (!passwordIsValid) {
      return res.status(401).json({
        message: 'Email ou senha inválidos.'
      })
    }

    const token = gerarToken(user.id)

    return res.json({
      message: 'Login realizado com sucesso.',
      user: limparUsuario(user),
      token
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno ao fazer login.'
    })
  }
}

async function me(req, res) {
  return res.json({
    user: limparUsuario(req.user)
  })
}

module.exports = {
  register,
  login,
  me
}