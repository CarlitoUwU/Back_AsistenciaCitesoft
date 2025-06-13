const { Router } = require('express')
const router = Router()
const attendanceController = require('../controllers/attendance.controller')
const verifyToken = require('../middleware/authMiddleware')

router.get('/', verifyToken(['ADMIN']), attendanceController.getAll)
router.get('/:id', verifyToken(['ADMIN']), attendanceController.getById)
router.post('/', verifyToken(['ESTUDIANTE']), attendanceController.create)
router.patch('/', verifyToken(['ESTUDIANTE']), attendanceController.update)
router.get('/hoy', verifyToken(['ESTUDIANTE']), attendanceController.getAttendancesByUserIdHoy)
router.get('/attendances/present-users', verifyToken(['ADMIN']), attendanceController.getUsersPresent)
router.get('/attendances/user', verifyToken(['ESTUDIANTE']), attendanceController.getAttendancesByUserId)
router.delete('/:id', verifyToken(['ADMIN']), attendanceController.deleteAttendance)

module.exports = router
