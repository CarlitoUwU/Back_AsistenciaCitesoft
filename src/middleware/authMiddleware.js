const jwt = require('jsonwebtoken')

function verifyToken (requiredRoles = []) {
  return (req, res, next) => {
    // Leer el token desde la cookie
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded

      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(decoded.role)
      ) {
        return res.status(403).json({ error: 'Acceso denegado: rol insuficiente' })
      }

      next()
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' })
    }
  }
}

module.exports = verifyToken
