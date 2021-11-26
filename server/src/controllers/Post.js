const hash = require("object-hash");

const Post = require("../models").Post;
const Comment = require("../models").Comment;
const User = require("../models").User;
const Community = require("../models").Community;
const Vote = require("../models").Vote;
const Sequelize = require('../models').Sequelize

const paginator = require("../utils/paginator");
const valueIsOk = require("../utils/valueChecker");
const internalError = require("../utils/internalError");

module.exports = {
  async getPost(req, res) {
    try {
      const id = req.params.id;
      let offset = req.query.page - 1; //Si estamos en la página 1, el offset será de 0 (no nos saltamos ningun comentario)
      let limit = req.query.limit;

      [offset, limit] = paginator(offset, limit, 20);

      const post = await Post.findOne({
        where: { id: id },
        include: [
          {
            limit,
            offset,
            required: false,
            model: Comment,
            order: [["createdAt", "DESC"]],
            where: {
              is_subComment: false,
            },
            include: [
              {
                required: false,
                model: Comment,
                as: "subComments",
                include: { model: User, attributes: ["nick"] },
              },
              {
                model: User,
                attributes: ["nick"],
              },
            ],
          },
          {
            model: User,
          },
        ],
      });

      if (!post) {
        res.status(404).send({
          errores: [{ error: `No se ha encontrado el Post con id ${id}` }],
        });
        return;
      }

      res.send({ post });
    } catch (e) {
      internalError(res, e, "getPost", "Post");
    }
  },
  async getPosts(req, res) {
    try {
      let offset = req.query.page - 1; //Si estamos en la página 1, el offset será de 0 (no nos saltamos ningun comentario)
      let limit = req.query.limit;

      [offset, limit] = paginator(offset, limit, 10);

      res.status(200).send(
        await Post.findAll({
          limit,
          offset,
          order: [["createdAt", "DESC"]],
          attributes: {
            include: [
              [
                Sequelize.fn(
                  "COUNT",
                  Sequelize.col("Comments.id")
                ),
                "numComments",
              ],
            ],
          },
          include: [
            {
              model: Comment,
              attributes: [],
            },
          ]
        })
      );

//       SELECT "Posts".*, COUNT("Comments"."id") as "numComments", "Communities"."name" as CommunityName, "Users"."nick" as "userNick"
// FROM "Posts"
// LEFT OUTER JOIN "Comments" AS "Comments" ON "Posts"."id" = "Comments"."PostId"
// LEFT OUTER JOIN "Communities" ON "Posts"."CommunityId" = "Communities"."id"
// LEFT OUTER JOIN "Users" ON "Posts"."UserId" = "Users"."id"
// GROUP BY "Posts"."id", "Comments"."id", "Communities"."name", "Users"."nick"
// ORDER BY "Posts"."createdAt" DESC
    } catch (e) {
      internalError(res, e, "getPosts", "Post");
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

      const post_data = {
        title,
        text,
        UserId: res.locals.user.id,
        CommunityId: community.dataValues.id,
      };

      /**
       * Comprobamos si han enviado algún dato, y lo guardamos
       */
      if (req.files && req.files.postImage) {
        const postImage = req.files.postImage;
        console.log("hola");
        let urlImage = "";
        const absolutePath = process.cwd();
        const relativePath =
          "/public/uploads/posts/" +
          hash({ ...post_data, date: new Date() }) + //Creamos el nombre de la imagen del post hasheando los datos del post + la fecha actual, para que no se solapen dos imágenes
          "." +
          postImage.mimetype.split("/")[1];

        urlImage = absolutePath + relativePath;

        postImage.mv(urlImage, (err) => {
          if (err) return internalError(res, err, "uploadFile", "Post");
        });

        post_data.url_image = relativePath.substring(7, relativePath.length); //extraemos /public/ del string
      }

      const new_post = await Post.create(post_data);

      new_post.dataValues.numComments = 0;
      new_post.dataValues.comments = [];
      new_post.dataValues.userNick = res.locals.user.nick;
      new_post.dataValues.communityName = community.dataValues.name;

      res.status(201).send({
        new_post,
      });
    } catch (e) {
      internalError(res, e, "createPost", "Post");
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

      if (!valueIsOk(value)) {
        res.status(400).send({
          errores: [{ error: "El valor no es correcto" }],
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

      res.status(201).send({
        post,
      });
    } catch (e) {
      internalError(res, e, "votePost", "Post");
    }
  },
  async deletePost(req, res) {
    try {
      const postId = req.params.id;

      if (!postId) {
        res.status(400).send({
          errores: [{ error: "No se ha introducido el id del post" }],
        });
        return;
      }

      const post = await Post.findByPk(postId);

      if (!post) {
        res.status(404).send({
          errores: [{ error: `No se ha encontrado el post con id ${postId}` }],
        });
        return;
      }

      const communityPost = await post.getCommunity();

      /**
       * Comprobamos que el post pertenezca al usuario que ha llamado a la petición, o que pertenezca
       * a la comunidad del usuario que ha llamado a la petición
       */
      if (
        post.dataValues.UserId !== res.locals.user.id &&
        communityPost.UserId !== res.locals.user.id
      ) {
        res.status(401).send({
          errores: [
            { error: "El usuario identificado no puede eliminar el Post" },
          ],
        });
        return;
      }

      Post.destroy({
        where: { id: postId },
      });

      res.send({
        Estado: "Post eliminado con éxito",
      });
    } catch (e) {
      internalError(res, e, "deletePost", "Post");
    }
  },
};
