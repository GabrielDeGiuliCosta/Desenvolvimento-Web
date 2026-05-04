const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        message: 'Token não enviado.'
      })
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({
        message: 'Token em formato inválido.'
      })
    }

    const [scheme, token] = parts

    if (scheme !== 'Bearer') {
      return res.status(401).json({
        message: 'Token deve usar o formato Bearer.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    })

    if (!user) {
      return res.status(401).json({
        message: 'Usuário do token não encontrado.'
      })
    }

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido ou expirado.'
    })
  }
}

module.exports = authMiddleware