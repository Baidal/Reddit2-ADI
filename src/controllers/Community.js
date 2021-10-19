const Community = require("../models").Community;
const Post = require("../models").Post;
const Comment = require("../models").Comment;
const Sequelize = require("../models").Sequelize;
const User = require("../models").User;

module.exports = {
  async createCommunity(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        res.status(400).send({
          errores: [{ error: "No se ha introducido el nombre" }],
        });
        return;
      }

      const existent_community = await Community.findOne({ where: { name } });

      if (existent_community) {
        res.status(400).send({
          errores: [{ error: "El nombre de la comunidad ya está en uso" }],
        });
        return;
      }

      const new_community = await Community.create({
        name,
        description,
        UserId: res.locals.user.id,
      });
      new_community.dataValues.posts = [];

      res.status(201).send(new_community);
    } catch (e) {
      console.log(
        "Se ha producido un error en 'createCommunity' del controlador 'Community': \n" +
          e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
  async getCommunity(req, res) {
    try {
      const name = req.params.name;

      const community = await Community.findOne({
        where: { name: name },
        attributes: {
          include: [
            [
              Sequelize.fn(
                "COUNT",
                Sequelize.col("userFollowsCommunity->user_community.UserId")
              ),
              "numFollowers",
            ],
          ],
        },
        include: [
          {
            model: Post,
            order: [["createdAt", "DESC"]],
            include: {
              model: Comment,
              attributes: [],
            },
            attributes: {
              include: [
                [
                  Sequelize.fn("COUNT", Sequelize.col("Posts->Comments.id")),
                  "numComments",
                ],
              ],
            },
          },
          {
            model: User,
            attributes: [],
            as: "userFollowsCommunity",
          },
        ],
        group: [
          "Community.id",
          "Posts.id",
          "userFollowsCommunity->user_community.createdAt",
          "userFollowsCommunity->user_community.updatedAt",
          "userFollowsCommunity->user_community.UserId",
          "userFollowsCommunity->user_community.CommunityId",
        ],
      });

      if (!community) {
        res.status(404).send({
          errores: [{ error: `No se ha encontrado la comunidad ${name}` }],
        });
        return;
      }
      /*
      const usersFollowing = await community.getUsers();

      community.dataValues.numFollowers = usersFollowing.length;*/
      res.status(200).send(community);
    } catch (e) {
      console.log(
        "Se ha producido un error en 'getCommunity' del controlador 'Community': \n" +
          e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
};
