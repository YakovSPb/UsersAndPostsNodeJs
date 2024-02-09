const express = require('express')

const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = process.env.PORT || 8080
const index = express()
index.use(cors())
index.use("/", (req, res) => {
    res.send("Server is running.")
})
index.use(express.json())
index.use('/api', userRouter)
index.use('/api', postRouter)
index.use('/api', authRouter)
index.use(cookieParser())
index.use(express.static('public'));

index.listen(PORT, )