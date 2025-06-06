const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/users.controller')

router.get('/', usersController.getAll)
router.get('/:id', usersController.getById)
router.post('/', usersController.create)
router.put('/:id', usersController.update)
router.delete('/:id', usersController.remove)

module.exports = router
