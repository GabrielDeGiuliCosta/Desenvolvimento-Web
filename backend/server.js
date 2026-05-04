const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    status: 'Backend Express funcionando!'
  })
})

app.get('/api/teste', (req, res) => {
  res.json({
    mensagem: 'API conectada ao React com sucesso.'
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})