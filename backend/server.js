const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3001

const authRoutes = require('./routes/authRoutes')
const sheetRoutes = require('./routes/sheetRoutes')

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origem não permitida pelo CORS'))
  },
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    status: 'Backend Express funcionando!'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/sheets', sheetRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})