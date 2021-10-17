const comparePasswords = require("../utils/checkPassword").comparePasswords;

/**
 * Middleware encargado de comprobar que el usuario pasado en el
 * body del request es correcto.
 */
module.exports = authMiddleware = async (req, res, next) => {
  const nickEmail = req.body.nickEmail;
  const pass = req.body.password;

  const errors = { errors: [] };

  if (!nickEmail) {
    errors.errors.push({ error: "Debes introducir el nick o el email" });
  }

  if (!pass) {
    errors.errors.push({ error: "Debes introducir el nick o el email" });
  }

  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: nickEmail }, { nick: nickEmail }],
    },
  });

  if (user) {
    //El usuario es correcto
    if (await comparePasswords(pass, user.password)) {
      res.locals.user = user;
      next();
    } else {
      //el usuario no es correcto
      res.status(401).send({
        errors: [
          {
            error: "El usuario introducido no es correcto",
          },
        ],
      });
      return;
    }
  }

  res.status(401).send({
    errors: [
      {
        error: "Los datos introducidos no corresponden a ningún usuario",
      },
    ],
  });
};
