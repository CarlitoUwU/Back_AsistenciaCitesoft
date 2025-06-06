const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')

require('dotenv').config()
require('./config/passport')

const authRoutes = require('./routes/auth.routes')

const app = express()
const logger = require('../loggerMiddleware')
const usersRouter = require('./routes/users.routes')

app.use(cors())
app.use(express.json())
app.use(logger)

app.use(session({
  secret: 'una_clave_secreta',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

app.get('/login-failed', (req, res) => {
  res.send('Error de autenticación')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  // console.clear();
  console.log(`Server running on port ${PORT}`)
  console.log(`Enlace a la aplicación: http://localhost:${PORT}`)
  console.log('-----------------------------------------------')
})
