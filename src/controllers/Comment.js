const Comment = require('../models').Comment
const Post = require('../models').Post

module.exports = {
    async createComment(req,res){
        const id = req.params.id

        const post = await Post.findByPk(id)

        if(!post) {
            res.status(404).send({
                errores: [
                    {error: `No se ha encontrado el post con id ${id}`}
                ]
            })

            return
        }

        const {text, commentId} = req.body

        if(!text) {
            res.status(400).send({
                errores: [
                    {error: `No se ha introducido el texto del comentario`}
                ]
            })

            return
        }

        //Creamos el comentario como subcomentario
        if(commentId && commentId !== -1) {

        } else {
            //creamos el comentario como nuevo
            const new_comment = await post.createComment({
                UserId: res.locals.user.id,
                text
            })

            res.status(201).send({new_comment})
        }
    }
} 