const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
const logger = require('../loggerMiddleware')
const usersRouter = require('./routes/users.routes')

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  // console.clear();
  console.log(`Server running on port ${PORT}`)
  console.log(`Enlace a la aplicación: http://localhost:${PORT}`)
  console.log('-----------------------------------------------')
})
