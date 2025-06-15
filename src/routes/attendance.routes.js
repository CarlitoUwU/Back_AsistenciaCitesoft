const { Router } = require('express')
const router = Router()
const attendanceController = require('../controllers/attendance.controller')
const verifyToken = require('../middleware/authMiddleware')

/**
 * @swagger
 * tags:
 *   name: Attendance
 */

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Obtener todas las asistencias
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de asistencias
 *       401:
 *         description: Token no válido o no enviado
 *       403:
 *         description: No tiene permisos (solo ADMIN puede acceder)
 */

router.get('/', verifyToken(['ADMIN']), attendanceController.getAll)

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Crear asistencia
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Asistencia creada
 *       400:
 *         description: Error al crear asistencia
 *       403:
 *         description: No tiene permisos (solo ESTUDIANTE puede acceder)
 */

router.post('/', verifyToken(['ESTUDIANTE']), attendanceController.create)

/**
 * @swagger
 * /api/attendance:
 *   patch:
 *     summary: Marca la salida de la asistencia
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Asistencia marcada correctamente
 *       400:
 *         description: Error al actualizar asistencia
 *       403:
 *         description: No tiene permisos (solo ESTUDIANTE puede acceder)
 */

router.patch('/', verifyToken(['ESTUDIANTE']), attendanceController.update)

/**
 * @swagger
 * /api/attendance/hoy:
 *   get:
 *     summary: Obtener asistencias del usuario para hoy
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Asistencias del usuario para hoy
 *       401:
 *         description: Token no válido o no enviado
 *       403:
 *         description: No tiene permisos (solo ESTUDIANTE puede acceder)
 */

router.get('/hoy', verifyToken(['ESTUDIANTE']), attendanceController.getAttendancesByUserIdHoy)

/**
 * @swagger
 * /api/attendance/user/present-users:
 *   get:
 *     summary: Obtener usuarios presentes
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios presentes
 *       401:
 *         description: Token no válido o no enviado
 *       403:
 *         description: No tiene permisos (solo ADMIN puede acceder)
 */

router.get('/user/present-users', verifyToken(['ADMIN']), attendanceController.getUsersPresent)

/**
 * @swagger
 * /api/attendance/user:
 *   get:
 *     summary: Obtener asistencias por ID de usuario
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de asistencias del usuario
 *       401:
 *         description: Token no válido o no enviado
 *       403:
 *         description: No tiene permisos (solo ESTUDIANTE puede acceder)
 */

router.get('/attendances/user', verifyToken(['ESTUDIANTE']), attendanceController.getAttendancesByUserId)

/**
 * @swagger
 * /api/attendance/{id}:
 *   delete:
 *     summary: Eliminar asistencia por ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asistencia a eliminar
 *     responses:
 *       200:
 *         description: Asistencia eliminada correctamente
 *       404:
 *         description: Asistencia no encontrada
 *       401:
 *         description: Token no válido o no enviado
 *       403:
 *         description: No tiene permisos (solo ADMIN puede acceder)
 */

router.delete('/:id', verifyToken(['ADMIN']), attendanceController.deleteAttendance)

/**
 * @swagger
 * /api/attendance/{id}:
 *   get:
 *     summary: Obtener asistencia por ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asistencia
 *     responses:
 *       200:
 *         description: Asistencia encontrada
 *       404:
 *         description: Asistencia no encontrada
 *       401:
 *         description: Token no válido o no enviado
 *       403:
 *         description: No tiene permisos (solo ADMIN puede acceder)
 */

router.get('/:id', attendanceController.getById)

module.exports = router
