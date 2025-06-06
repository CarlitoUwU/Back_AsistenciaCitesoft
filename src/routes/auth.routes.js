const express = require('express')
const passport = require('passport')
const router = express.Router()
const { googleRedirect } = require('../controllers/auth.controller')

// Inicia el flujo de autenticación
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Callback de redirección
router.get('/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login-failed', session: false }),
  googleRedirect
)

module.exports = router
