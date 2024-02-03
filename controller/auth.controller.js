const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class AuthController {
    async loginGet(req, res) {
        const {name, surname} = req.body
        // const newPerson = await db.query('INSERT INTO person (name, surname) values($1, $2) RETURNING *', [name, surname])
        // res.json(newPerson.rows[0])
    }
    async loginPost(req, res) {
        const {email, password} = req.body
        try {
            const user = await db.query('SELECT * FROM person where email = $1', [email])
            if(!user.rows.length){
                res.status(404).send('user not found')
                return
            }

            const isValidPass = await bcrypt.compare(password,user.rows[0].password)

            if(!isValidPass){
                res.status(404).send('wrong login or password')
                return
            }

            const token = jwt.sign(
            {
                _id: user.rows[0].id
            },
            'secret123',
                {
                    expiresIn: '30d'
                }
            )
            const { passwordHash, ...usertData }  = user.rows[0];

            res.status(201).json({
                ...usertData,
                token
            });
        } catch(err) {
            console.log('err',err)
            res.status(500).send('failed to authorize')
        }


        // const token = jwt.sign({
        //     email: req.body.email,
        //     password: req.body.password
        // })
        // res.json({
        //     success: true,
        //     token,
        // })
        // const {name, surname} = req.body
        // const newPerson = await db.query('INSERT INTO person (name, surname) values($1, $2) RETURNING *', [name, surname])
        // res.json(newPerson.rows[0])
    }
    async signUpGet(req, res) {
        res.render('signUpGet')
        // const {name, surname} = req.body
        // const newPerson = await db.query('INSERT INTO person (name, surname) values($1, $2) RETURNING *', [name, surname])
        // res.json(newPerson.rows[0])
    }
    async signUpPost(req, res) {
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt()
        const saltPassword = await bcrypt.hash(password, salt)
        try {
            const user = await db.query('SELECT * FROM person where email = $1', [email])
            if(user.rows.length){
                res.status(400).send('mail is already in use')
                return
            }
            const newPerson = await db.query('INSERT INTO person (name, email, password) values($1, $2, $3) RETURNING *', [name, email, saltPassword])
            res.status(201).json(newPerson.rows[0]);

        } catch(err) {
            console.log('err',err)
            res.status(400).send('error, user not created')
        }
    }
    async authMe(req, res) {
           try {
               const user = await db.query('SELECT * FROM person where id = $1', [req.userId])

               if(!user){
                   return res.status(404).json({
                       message: 'user not found'
                   })
               }

               const { passwordHash, ...usertData }  = user.rows[0];

               res.status(201).json(usertData);
           } catch (err) {
               res.status(500).send('access denied')
           }
    }

}

module.exports = new AuthController()