const { Router } = require('express')
const swaggerSpec = require('../config/swagger')

const router = Router()

router.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

module.exports = router
