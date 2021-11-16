const jwt = require("jwt-simple");
const jwtConf = require("../config/jwtConf");

/**
 * Middleware encargado de comprobar que el usuario pasado en el
 * body del request es correcto.
 */
module.exports = authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      errores: [
        {
          error: "Token no introducido en la petición",
        },
      ],
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {

    const user = jwt.decode(token, jwtConf.SECRET);
    res.locals.user = user;
    return next();

  } catch (e) {
    //Se lanza una excepcion al decodificar el token
    res.status(401).send({
      errors: [
        {
          error:
            "El token introducido no e correcto o no se ha podido decodificar",
        },
      ],
    });
  }
};
