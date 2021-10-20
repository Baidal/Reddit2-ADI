const Comment = require("../models").Comment;
const Post = require("../models").Post;
const Community = require("../models").Community;
const sequelize = require("../models").sequelize;

module.exports = {
  async createComment(req, res) {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;
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
          is_subComment: true,
        });

        actualComment.addSubComment(new_subcomment);

        res.status(201).send({
          new_subcomment,
        });
      } else {
        //creamos el comentario como nuevo
        const new_comment = await post.createComment({
          UserId: userId,
          text,
          is_subComment: false,
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
  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;
      const userId = res.locals.user.id;

      if (!userId) {
        res.status(400).send({
          errores: [{ error: "No se ha introducido el id del comentario" }],
        });
        return;
      }

      const deleting_comment = await Comment.findByPk(commentId);

      if (!deleting_comment) {
        res.status(404).send({
          errores: [
            { error: `No se ha encontrado el comentario con id ${commentId}` },
          ],
        });
        return;
      }

      const post_comment = await Post.findByPk(
        deleting_comment.dataValues.PostId
      );
      const community_comment = await Community.findByPk(
        post_comment.dataValues.CommunityId
      );

      /**
       * Guardamos los id de los creadores del comentario, del post y de la comunidad
       * para comprobar que el usuario logeado puede eliminarlos
       */
      const ownerPostId = post_comment.dataValues.UserId;
      const ownerCommunityId = community_comment.dataValues.UserId;
      const ownerCommentId = deleting_comment.dataValues.UserId;

      if (
        userId !== ownerCommunityId &&
        userId !== ownerPostId &&
        userId !== ownerCommentId
      ) {
        res.status(401).send({
          errores: [
            { error: "No tienes permisos para eliminar este comentario" },
          ],
        });
        return;
      }

      //Eliminamos primero los subcomentarios si el comentario no es un subcomentario
      if (!deleting_comment.dataValues.is_subComment)
        await sequelize.query(`
          delete from "Comments"
          where "id" IN (
            select "subCommentId"
            from "comment_comment"
            where "CommentId" = ${commentId}
          )
      `);

      Comment.destroy({
        where: { id: commentId },
      });

      res.status(200).send({
        Estado: "Comentario y subcomentarios eliminados con éxito",
      });
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
