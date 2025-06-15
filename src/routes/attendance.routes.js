const { Router } = require('express')
const router = Router()
const attendanceController = require('../controllers/attendance.controller')
const verifyToken = require('../middleware/authMiddleware')

router.get('/', verifyToken(['ADMIN']), attendanceController.getAll)
router.post('/entry', verifyToken(['ESTUDIANTE']), attendanceController.entry)
router.post('/exit', verifyToken(['ESTUDIANTE']), attendanceController.exit)
router.get('/hoy', verifyToken(['ESTUDIANTE']), attendanceController.getAttendancesByUserIdHoy)
router.get('/user/present', verifyToken(['ADMIN']), attendanceController.getUsersPresent)
router.get('/user', verifyToken(['ESTUDIANTE']), attendanceController.getAttendancesByUserId)
router.get('/user/:id', verifyToken(['ADMIN']), attendanceController.getAttendancesByUserId)
router.get('/hoy/:id', verifyToken(['ESTUDIANTE']), attendanceController.getAttendancesByUserIdHoy)
router.delete('/:id', verifyToken(['ADMIN']), attendanceController.deleteAttendance)
router.get('/:id', attendanceController.getById)

module.exports = router
