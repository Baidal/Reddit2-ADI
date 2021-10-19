const Post = require("../models").Post;
const Comment = require("../models").Comment;
const User = require("../models").User;
const Community = require("../models").Community;
const Vote = require("../models").Vote;

module.exports = {
  async getPost(req, res) {
    try {
      const id = req.params.id;

      const post = await Post.findOne({
        where: { id: id },
        include: [
          {
            model: Comment,
            order: ["createdAt", "DESC"],
          },
          {
            model: User,
            order: ["createdAt", "DESC"],
          },
        ],
      });

      if (!post) {
        res.status(404).send({
          errors: [{ error: `No se ha encontrado el Post con id ${id}` }],
        });
        return;
      }

      res.send({ post });
    } catch (e) {
      console.log(
        "Se ha producido un error en 'getPost' del controlador 'Post': \n" + e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
  async createPost(req, res) {
    try {
      const com_name = req.params.com_name;

      if (!com_name) {
        res.status(400).send({
          errores: [
            { error: "No se ha introducido el nombre de la comunidad" },
          ],
        });
        return;
      }

      const community = await Community.findOne({
        where: { name: com_name },
      });

      if (!community) {
        res.status(400).send({
          errores: [{ error: `No se ha encontrado la comunidad ${com_name}` }],
        });
        return;
      }

      const { title, text } = req.body;

      if (!title) {
        res.status(400).send({
          errores: [{ error: `No se ha introducido el título del post` }],
        });
        return;
      }

      const new_post = await Post.create({
        title,
        text,
        UserId: res.locals.user.id,
        CommunityId: community.dataValues.id,
      });

      new_post.dataValues.numComments = 0;
      new_post.dataValues.comments = [];
      new_post.dataValues.userNick = res.locals.user.nick;
      new_post.dataValues.communityName = community.dataValues.name;

      res.status(201).send({
        new_post,
      });
    } catch (e) {
      console.log(
        "Se ha producido un error en 'createPost' del controlador 'Post': \n" +
          e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
  async votePost(req, res) {
    try {
      const postId = req.params.id;

      const post = await Post.findOne({ where: { id: postId } });

      if (!post) {
        res.status(404).send({
          errores: [{ error: `No se ha encontrado el post con id ${postId}` }],
        });
        return;
      }

      const value = req.body.value;

      if (!value) {
        res.status(400).send({
          errores: [{ error: "No se ha introducido el valor del post" }],
        });
        return;
      }

      if (isNaN(value) || (value !== -1 && value !== 1)) {
        res.status(400).send({
          errores: [{ error: "El valor del post no es correcto" }],
        });
        return;
      }

      const current_vote = await Vote.findOne({
        where: {
          UserId: res.locals.user.id,
          PostId: post.dataValues.id,
        },
      });

      //El usuario ya había votado en el post
      if (current_vote) {
        //El usuario ha votado lo mismo que ya tenía
        if (current_vote.value === value) {
          res.status(200).send({ post });
          return;
        } else {
          //El usuario cambia de voto
          current_vote.value = value;
          current_vote.save();

          /**
           * Actualizamos el valor de 'votes' de post. Tener en cuenta que al cambiar de voto,
           * estamos quitando el voto que ya tenía y le estamos añadiendo otro. Esto es, si el
           * voto que ya tenía era negativo, y este tenia un 'votes' de 14, le quitamos el voto negativo,
           * 'votes' pasa a ser 15 y luego le añadimos el voto positivo, por lo que pasa a valer 16
           */
          post.votes += value * 2;
          post.save();
        }
      } else {
        //El usuario aun no ha votado en el post
        Vote.create({
          UserId: res.locals.user.id,
          PostId: post.id,
          value: value,
        });

        //Actualizamos el valor de 'votes' de post
        post.votes += value;
        post.save();
      }

      res.status(200).send({
        post,
      });
    } catch (e) {
      console.log(
        "Se ha producido un error en 'votePost' del controlador 'Post': \n" + e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
  async deletePost(req, res) {
    try {
      const postId = req.params.id;

      if (!postId) {
        res.status(400).send({
          errores: [{ error: "No se ha introducido el id del post" }],
        });
        return
      }

      const post = await Post.findByPk(postId)

      if (!post) {
        res.status(404).send({
          errores: [{ error: `No se ha encontrado el post con id ${postId}` }],
        });
        return;
      }

      const communityPost = await post.getCommunity()

      /**
       * Comprobamos que el post pertenezca al usuario que ha llamado a la petición, o que pertenezca
       * a la comunidad del usuario que ha llamado a la petición
       */
      if(post.dataValues.UserId !== res.locals.user.id && communityPost.UserId !== res.locals.user.id){
        res.status(401).send({
          errores: [
            {error: "El usuario identificado no puede eliminar el Post"}
          ]
        })
        return
      }

      Post.destroy({
        where: {id: postId}
      })

      res.send({
        "Estado": "Post eliminado con éxito"
      })

    } catch (e) {
      console.log(
        "Se ha producido un error en 'deletePost' del controlador 'Post': \n" + e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
};
