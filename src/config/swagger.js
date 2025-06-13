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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: process.env.URL_LOCAL || 'http://localhost:5000'
      }
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints para autenticación'
      },
      {
        name: 'Users',
        description: 'Endpoints para gestionar usuarios'
      },
      {
        name: 'Attendance',
        description: 'Endpoints para gestionar asistencia'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Rutas donde agregarás comentarios Swagger
}

const swaggerSpec = swaggerJsdoc(options)
module.exports = swaggerSpec
