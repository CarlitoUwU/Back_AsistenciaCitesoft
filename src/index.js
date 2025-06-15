require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('./middleware/loggerMiddleware')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/auth.routes')
const usersRouter = require('./routes/users.routes')
const attendanceRouter = require('./routes/attendance.routes')
const swaggerRoutes = require('./routes/swagger.routes')
const path = require('path')

require('./config/passport')

const app = express()

app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../swagger.html'))
})

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(express.json())
app.use(logger)

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.use('/api/users', usersRouter)
app.use('/api/attendance', attendanceRouter)
app.use(swaggerRoutes)

app.get('/api/me', (req, res) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'No autenticado' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ user: decoded })
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' })
  }
})

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
  process.stdout.write('\x1Bc')
  console.log(`Server running on port ${PORT}`)
  console.log(`Enlace a la aplicación: http://localhost:${PORT}`)
  console.log('-----------------------------------------------')
})
