const Router = require('express')
const router = new Router()
const authController =require('../controller/auth.controller')

router.get('/singup', authController.signUpGet)
router.post('/singup', authController.signUpPost)
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)


module.exports = router
