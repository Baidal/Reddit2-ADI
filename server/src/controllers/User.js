const User = require("../models").User;
const sequelize = require("../models").sequelize;
const { QueryTypes } = require("sequelize");

const paginator = require("../utils/paginator");
const internalError = require("../utils/internalError");

module.exports = {
  async getCommunities(req, res) {
    try {
      const userId = req.params.id;
      console.log(userId);
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send({
          errores: [
            { error: `No se ha encontrado el usuario con id ${userId}` },
          ],
        });
      }

      res.status(200).send(await user.getCommunities());
    } catch (e) {
      internalError(res, e, "getCommunities", "User");
    }
  },
  async getRelatedPosts(req, res) {
    try {
      let offset = req.query.page - 1; //Si estamos en la página 1, el offset será de 0 (no nos saltamos ningun comentario)
      let limit = req.query.limit;

      [offset, limit] = paginator(offset, limit, 10);

      const query = await sequelize.query(
        `select "Posts".*, 
            (
              select count("Comments"."id")
              from "Comments"
              where "Comments"."PostId" = "Posts"."id"
            ) AS "numComments",
            "Communities"."name" as "communityname"
          from public."Posts" as "Posts"
            left outer join "Communities" on "Communities"."id" = "Posts"."CommunityId"
          where "CommunityId" in (select "CommunityId" from public."user_community" where "UserId" = $userid)
          order by "Posts"."createdAt" DESC
          OFFSET $offset
          LIMIT $limit`,
        {
          type: QueryTypes.SELECT,
          bind: {
            userid: res.locals.user.id,
            offset,
            limit,
          },
        }
      );

      res.send(query);
    } catch (e) {
      internalError(res, e, "getRelatedPosts", "User");
    }
  },
  async getUser(req, res) {
    const nick = req.params.name;

    const user = await User.findOne({ where: { nick } });

    if (!user)
      return res.status(404).send({
        errores: [{ error: `No se ha encontrado al usuario ${nick}` }],
      });

    res.send({ user });
  },
  async updateUser(req, res) {
    try {
      const user = res.locals.user;
      const { nick, password, description } = req.body;

      console.log(nick);

      const userDb = await User.findByPk(user.id);

      userDb.nick = nick;
      if(password !== "")
        userDb.password = password;
      userDb.description = description;
      console.log(userDb)

      let urlImage = "";
      let absolutePath = "";
      let relativePath = "";

      if (req.files && req.files.userImage) {
        const profileImage = req.files.userImage;

        absolutePath = process.cwd();
        relativePath =
          "/public/uploads/profiles/" +
          nick +
          "." +
          profileImage.mimetype.split("/")[1];

        urlImage = absolutePath + relativePath;

        profileImage.mv(urlImage, (err) => {
          if (err) return internalError(res, err, "updateUser", "User");
        });

        relativePath = relativePath.substring(7, relativePath.length);
        userDb.url_image = relativePath;
      }

      await userDb.save();

      return res.send({
        user: userDb,
      });
    } catch (e) {
      internalError(res, e, "updateUser", "User")
    }
  },
};
