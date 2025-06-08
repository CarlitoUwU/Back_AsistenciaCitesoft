const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/users.controller')
const verifyToken = require('../middleware/authMiddleware')

router.get('/', verifyToken(['ADMIN']), usersController.getAll)
router.get('/:id', verifyToken(['ADMIN']), usersController.getById)
router.post('/', verifyToken(['ADMIN']), usersController.create)
router.put('/:id', verifyToken(['ADMIN']), usersController.update)
router.delete('/:id', verifyToken(['ADMIN']), usersController.remove)

module.exports = router
