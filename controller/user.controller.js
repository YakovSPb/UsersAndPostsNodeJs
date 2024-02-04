const db = require('../db')
class UserController {
    async createUser(req, res) {
        try{
            const {name, email, password} = req.body
            const newPerson = await db.query('INSERT INTO person (name, email, password) values($1, $2, $3) RETURNING *', [name, email, password])
            res.json(newPerson.rows[0])
        } catch(e){
            res.status(500).json({
                message: 'Не удалось создать пользователя'
            })
        }
    }
    async getUsers(req, res) {
        try{
            const users = await db.query('SELECT * FROM person')
            res.json(users.rows)
        } catch(e){
            res.status(500).json({
                message: 'Не удалось получить пользователей'
            })
        }
    }
    async getOneUser(req, res) {
        try{
            const id = req.params.id
            const user = await db.query('SELECT * FROM person where id = $1', [id])
            res.json(user.rows[0])
        } catch(e) {
            res.status(500).json({
                message: 'Не удалось получить пользователя'
            })
        }
    }
    async updateUser(req, res) {
        try{
            const {id, name, surname} = req.body
            const user = await db.query(
                'UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *',
                [name, surname, id])
            res.json(user.rows[0])
        } catch(e) {
            res.status(500).json({
                message: 'Не удалось обновить пользователя'
            })
        }
    }
    async deleteUser(req, res) {
        try{
            const id = req.params.id
            const user = await db.query('DELETE FROM person where id = $1', [id])
            res.json(user.rows[0])
        } catch(e) {
            res.status(500).json({
                message: 'Не удалось удалить пользователя'
            })
        }
    }
}

module.exports = new UserController()