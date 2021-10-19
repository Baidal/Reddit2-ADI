const Post = require("../models").Post;
const Comment = require("../models").Comment;
const User = require("../models").User;
const Community = require("../models").Community;

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
        CommunityId: community.dataValues.id
      });

      new_post.dataValues.numComments = 0
      new_post.dataValues.comments = []
      new_post.dataValues.userNick = res.locals.user.nick
      new_post.dataValues.communityName = community.dataValues.name

      res.status(201).send({
        new_post,
      });
    } catch (e) {
      console.log(
        "Se ha producido un error en 'createPost' del controlador 'Post': \n" + e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
};
