const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
const usersModel = require('../models/users.model')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value

    if (!email.endsWith('@unsa.edu.pe')) {
      return done(null, false)
    }

    // Buscar usuario en la base de datos
    const user = await usersModel.findByEmail(email)

    if (!user) {
      // Usuario no registrado, bloquear el acceso
      return done(null, false) // no se pasa el user => va a req.user = undefined
    }

    // Usuario registrado, generar token
    const token = jwt.sign({
      email: user.email,
      role: user.role
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    console.log('Token generado:', token)

    // Adjuntamos el token al objeto user
    return done(null, { token })
  } catch (err) {
    return done(err, false)
  }
}
))

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})
