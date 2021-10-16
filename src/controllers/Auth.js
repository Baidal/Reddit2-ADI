const User = require("../models").User;
const jwt = require("jwt-simple");
const jwtConfig = require("../config/jwtConf");

const { Op } = require("sequelize");

module.exports = {
  async register(req, res) {
    try {
      const { nick, password, description, email } = req.body;
      const errors = {errors: []}

      const userAlreadyLogged = await User.findOne({
        where: {
          [Op.or]: [
            {
              nick: nick,
            },
            {
              email: email
            }
          ],
        },
      });

      if(userAlreadyLogged) {
        if(userAlreadyLogged.email === email)
          errors.errors.push({error: "El email introducido ya existe."})

        if(userAlreadyLogged.nick === nick)
          errors.errors.push({error: "El nick introducido ya existe."})

        res.status(400).send(errors)
        return
      }

      const new_user = await User.create(req.body)
      res.status(201).send({new_user})


    } catch (e) {
      console.log(
        "Se ha producido un error en 'register' del controlador 'Auth': \n" + e
      );
    }
  },
};
