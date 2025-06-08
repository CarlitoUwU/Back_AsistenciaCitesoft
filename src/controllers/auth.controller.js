exports.googleRedirect = (req, res) => {
  const token = req.user?.token
  if (token) {
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Solo por HTTPS en prod
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000 // 1 hora
    })

    // Redirige al frontend o cierra popup
    res.redirect(process.env.FRONTEND_REDIRECT || '/')
  } else {
    res.redirect('/login-failed')
  }
}
