const express = require('express')
const http = require
const https = require('follow-redirects').https;
const fs = require("fs")
const path = require("path")
const url = require('url')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', postRouter)
app.use('/api', authRouter)
app.use(cookieParser())
app.use(express.static('public'));

//cookies
// app.get('/set-cookies', (req, res)=> {
//     console.log('you got the cookies')
//     res.setHeader('Set-Cookie', 'newUser=true')
//     res.send('you got the cookies!')
// })
//
// app.get('/read-cookies', (req, res)=> {
//
// })


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/html/main.html');
// })
// app.get('/about', (req, res) => {
//     res.sendFile(__dirname + '/public/html/about.html');
// })
// app.get('/admin', (req, res) => {
//     res.sendFile(__dirname + '/public/html/not_admin.html');
// })
// app.get('/contact', (req, res) => {
//     res.sendFile(__dirname + '/public/html/contact.html');
// })
// app.get('/cabinet', (req, res) => {
//
// })
//
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/public/html/login.html');
// })
// app.get('/register', (req, res) => {
//     res.sendFile(__dirname + '/public/html/register.html');
// })
// app.use(function(req, res, next) {
//     res.status(404);
//
//     // respond with html page
//     if (req.accepts('html')) {
//         res.sendFile(__dirname + '/public/html/404.html');
//         return;
//     }
//
//     // respond with json
//     if (req.accepts('json')) {
//         res.json({ error: 'Not found' });
//         return;
//     }
//
//     // default to plain-text. send()
//     res.type('txt').send('Not found');
// });

app.listen(PORT, )