const swaggerJsdoc = require('swagger-jsdoc')
require('dotenv').config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Asistencia CITESOFT',
      version: '1.0.0',
      description: 'Documentación de la API de asistencia'
    },
    servers: [
      {
        url: process.env.URL_LOCAL || 'http://localhost:5000'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Rutas donde agregarás comentarios Swagger
}

const swaggerSpec = swaggerJsdoc(options)
module.exports = swaggerSpec
