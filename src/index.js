const express = require('express')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

require('dotenv').config()
require('./config/passport')

const authRoutes = require('./routes/auth.routes')
const usersRouter = require('./routes/users.routes')
const attendanceRouter = require('./routes/attendance.routes')
const swaggerRoutes = require('./routes/swagger.routes')

const app = express()
const logger = require('./middleware/loggerMiddleware')

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
const path = require('path')

app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../swagger.html'))
})

app.use(cors())
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
  console.clear()
  console.log(`Server running on port ${PORT}`)
  console.log(`Enlace a la aplicación: http://localhost:${PORT}`)
  console.log('-----------------------------------------------')
})
