const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/users.controller')
const verifyToken = require('../middleware/authMiddleware')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestionar users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de users
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener user por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del user
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un user por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un user por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del user
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */

router.get('/', verifyToken(['ADMIN']), usersController.getAll)
router.get('/:id', verifyToken(['ADMIN']), usersController.getById)
router.post('/', verifyToken(['ADMIN']), usersController.create)
router.put('/:id', verifyToken(['ADMIN']), usersController.update)
router.delete('/:id', verifyToken(['ADMIN']), usersController.remove)

module.exports = router
