const Router = require('express')
const router = new Router()
const userController =require('../controller/user.controller')
const checkAuth = require("../utils/checkAuth");

router.post('/user', checkAuth, userController.createUser)
router.get('/user', checkAuth, userController.getUsers)
router.get('/user/:id', checkAuth, userController.getOneUser)
router.put('/user', checkAuth, userController.updateUser)
router.delete('/user/:id', checkAuth, userController.deleteUser)

module.exports = router
