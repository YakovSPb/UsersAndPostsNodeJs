const db = require("../db");

class PostController {
    async createPost(req, res){
        try{
            const {title, content, url, userId} = req.body
            const newPost = await db.query(`INSERT INTO post (title, content, url,  user_id) values($1, $2, $3, $4) RETURNING *`, [title, content, url, userId])
            res.json(newPost.rows[0])
        } catch(e){
            res.status(500).json({
                message: 'Не удалось создать статью'
            })
        }
    }

    async getPostsByUser(req, res) {
        try{
            const page = req.query.page || 1;
            const pageSize = 6;
            const offset = (page - 1) * pageSize;
            const result = await db.query(
                'SELECT * FROM post ORDER BY id LIMIT $1 OFFSET $2',
                [pageSize, offset]
            );
            const posts = await db.query('SELECT * from post')
            const data = {
                posts: result.rows,
                count: posts.rows.length
            }
            res.json(data)
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
    async getOnePost(req, res) {
        try{
            const id = req.query.id
            const post = await db.query('SELECT * FROM post where id = $1', [id])
            res.json(post.rows[0])
        } catch(e) {
            res.status(500).json({
                message: 'Не удалось получить пост'
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
            const {id, title, content} = req.body.data
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