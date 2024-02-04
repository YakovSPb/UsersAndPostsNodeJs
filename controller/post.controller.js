const db = require("../db");

class PostController {
    async createPost(req, res){
        try{
            const {title, content, userId} = req.body
            const newPost = await db.query(`INSERT INTO post (title, content, user_id) values($1, $2, $3) RETURNING *`, [title, content, userId])
            res.json(newPost.rows[0])
        } catch(e){
            res.status(500).json({
                message: 'Не удалось создать статью'
            })
        }
    }

    async getPostsByUser(req, res) {
        try{
            const posts = await db.query('SELECT * from post')
            res.json(posts.rows)
        } catch(e) {
            res.status(500).json({
                message: 'Не удалось получить статьи'
            })
        }
    }
    async getPostById(req, res) {
        try{
            const {id, userId} = req.body
            const posts = await db.query('SELECT * from post where user_id = $1', [userId])
            const post = posts.rows.find(p=> p.id === id)
            res.json(post)
        } catch(e){
            res.status(500).json({
                message: 'Не удалось получить статью'
            })
        }
    }
    async  deletePost(req, res) {
        try{
            const id = req.query.id
            const post = await db.query('DELETE FROM post where id = $1', [id])
            res.json(post.rows[0])
        } catch(e){
            res.status(500).json({
                message: 'Не удалось удалить статью'
            })
        }
    }
    async  updatePost(req, res) {
        try{
            const {id, title, content} = req.body
            const post = await db.query(
                'UPDATE post set title = $1, content = $2 where id = $3 RETURNING *',
                [title, content, id])
                res.json(post.rows[0])
        } catch(e) {
            res.status(500).json({
                message: 'Не удалось обновить статью'
            })
        }
    }
    async  uploadImage(req, res) {
        console.log('fired')
        try{
          return  res.json({
                url: `/uploads/${req.file.originalname}`
            })
        } catch(e) {
            res.status(500).json({
                message: 'Не удалось загрузить картинку'
            })
        }
    }

}

module.exports = new PostController()