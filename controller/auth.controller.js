const db = require('../db')
const bcrypt = require('bcrypt')
class AuthController {
    async loginGet(req, res) {
        res.send('loginGet')
        // const {name, surname} = req.body
        // const newPerson = await db.query('INSERT INTO person (name, surname) values($1, $2) RETURNING *', [name, surname])
        // res.json(newPerson.rows[0])
    }
    async loginPost(req, res) {


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
}

module.exports = new AuthController()