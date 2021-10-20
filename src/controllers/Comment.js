const Comment = require("../models").Comment;
const Post = require("../models").Post;

module.exports = {
  async createComment(req, res) {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id
      const post = await Post.findByPk(id);

      if (!post) {
        res.status(404).send({
          errores: [{ error: `No se ha encontrado el post con id ${id}` }],
        });

        return;
      }

      const { text, commentId } = req.body;

      if (!text) {
        res.status(400).send({
          errores: [{ error: `No se ha introducido el texto del comentario` }],
        });

        return;
      }

      //Creamos el comentario como subcomentario
      if (commentId && commentId !== -1) {
        const actualComment = await Comment.findByPk(commentId);

        if (!actualComment) {
          res.status(404).send({
            errores: [
              {
                error: `No se ha encontrado el comentario con id ${commentId}`,
              },
            ],
          });
          return;
        }

        const new_subcomment = await post.createComment({
            text,
            UserId: userId,
            is_subComment: true
        });

        actualComment.addSubComment(new_subcomment)

        res.status(201).send({
          new_subcomment,
        });
      } else {
        //creamos el comentario como nuevo
        const new_comment = await post.createComment({
          UserId: userId,
          text,
          is_subComment: false
        });

        res.status(201).send({ new_comment });
      }
    } catch (e) {
      console.log(
        "Se ha producido un error en 'createComment' del controlador 'Comment': \n" +
          e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
};
