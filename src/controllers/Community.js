const Community = require("../models").Community;
const Post = require("../models").Post;
const Comment = require("../models").Comment;
const Sequelize = require("../models").Sequelize;
const User = require("../models").User;
const internalError = require("../utils/internalError");

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
      internalError(res, e, "createCommunity", "Community");
    }
  },
  async getCommunity(req, res) {
    try {
      const name = req.params.name;
      let offset = req.query.page - 1; //Si estamos en la página 1, el offset será de 0 (no nos saltamos ningun comentario)
      let limit = req.query.limit;

      /**
       * Nos aseguramos de que se hayan introducido los valores en la url
       */
      offset = offset ? offset : 0;
      limit = limit ? limit : 20;
 
      limit = limit > 10 ? 10 : limit; //comprobamos que el limite no supere los 20 casos
      offset = limit * offset;

      const community = await Community.findOne({
        where: { name: name },
        limit,
        offset,
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
            required: false,
            model: Post,
            include: [
              {
                required: false,
                model: Comment,
                attributes: [],
              },
              {
                required: false,
                model: User,
                attributes: ["nick"],
              },
            ],
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
          "Posts->User.id",
        ],
        order: [
          [Post, "createdAt", "DESC"]
        ],
        subQuery: false
      });

      if (!community) {
        res.status(404).send({
          errores: [{ error: `No se ha encontrado la comunidad ${name}` }],
        });
        return;
      }

      res.status(200).send(community);
    } catch (e) {
      internalError(res, e, "getCommunity", "Community");
    }
  },
  async followCommunity(req, res) {
    try {
      const communityName = req.params.name;

      const community = await Community.findOne({
        where: { name: communityName },
      });

      const user = res.locals.user;

      if (!community) {
        res.status(404).send({
          errores: [
            { error: `No se ha encontrado la comunidad ${communityName}` },
          ],
        });
      }

      //el usuario ya sigue la comunidad, la eliminamos
      if (await community.hasUserFollowsCommunity(user.id)) {
        community.removeUserFollowsCommunity(user.id);
        res.status(200).send({
          status: "Comunidad eliminada con éxito",
        });
      } else {
        //el usuario no sigue la comunidad
        community.addUserFollowsCommunity(user.id);
        res.status(200).send({
          status: "Comunidad añadida con éxito",
        });
      }
    } catch (e) {
      internalError(res, e, "followCommunity", "Community");
    }
  },
};
