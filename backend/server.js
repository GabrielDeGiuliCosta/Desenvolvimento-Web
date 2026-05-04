const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const sheetRoutes = require('./routes/sheetRoutes')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})