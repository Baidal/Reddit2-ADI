const jwt = require("jwt-simple");
const jwtConf = require("../config/jwtConf");
const comparePasswords = require("../utils/checkPassword").comparePasswords;

/**
 * Middleware encargado de comprobar que el usuario pasado en el
 * body del request es correcto.
 */
module.exports = authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({
      errors: [
        {
          error: "Token no introducido en la petición",
        },
      ],
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.decode(token, jwtConf.SECRET);

  if (user) {
    res.locals.user = user;
    next()
  }

  res.status(401).send({
    errors: [
      {
        error: "El token introducido no e correcto o no se ha podido decodificar",
      },
    ],
  });
};
