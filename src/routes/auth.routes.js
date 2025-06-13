const express = require('express')
const passport = require('passport')
const router = express.Router()
const { googleRedirect } = require('../controllers/auth.controller')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticación
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Iniciar autenticación con Google
 *     tags: [Auth]
 *     security: []
 *     responses:
 *       302:
 *         description: Redirige a la página de autenticación de Google
 */

/**
 * @swagger
 * /auth/google/redirect:
 *   get:
 *     summary: Redirección después de autenticación con Google
 *     tags: [Auth]
 *     security: []
 *     responses:
 *       200:
 *         description: Autenticación exitosa y redirige al cliente
 *       401:
 *         description: Error de autenticación
 */

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
