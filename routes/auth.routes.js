const Router = require('express')
const router = new Router()
const authController =require('../controller/auth.controller')
const checkAuth = require("../utils/checkAuth");

router.get('/singup', authController.signUpGet)
router.post('/singup', authController.signUpPost)
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)
router.get('/auth/me', checkAuth, authController.authMe)
module.exports = router
