const Router = require('express')
const router = new Router()
const postController = require('../controller/post.controller')
const checkAuth = require("../utils/checkAuth");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req,file, cb) => {
        console.log('file', file)
        cb(null, file.originalname)
    },
})

const upload = multer({storage})

router.post('/post',checkAuth, postController.createPost)
router.post('/posts',checkAuth, postController.getPostById)
router.get('/posts',checkAuth, postController.getPostsByUser)
router.get('/post', checkAuth, postController.getOnePost)
router.delete('/post',checkAuth, postController.deletePost)
router.put('/post',checkAuth, postController.updatePost)
router.post('/upload',checkAuth, upload.single('image'), postController.uploadImage)

module.exports = router
