const User = require("../models").User;
const sequelize = require("../models").sequelize;
const { QueryTypes } = require("sequelize");

const paginator = require("../utils/paginator");
const internalError = require("../utils/internalError");

module.exports = {
  async getCommunities(req, res) {
    try {
      const userId = req.params.id;

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
        `select * 
              from public."Posts" 
              where "CommunityId" in (select "CommunityId" from public."user_community" where "UserId" = $userid)
              order by "createdAt" DESC
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
};
