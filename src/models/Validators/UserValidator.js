const Joi = require("joi");

module.exports = {
  registerValidations(req, res, next) {
    const user = Joi.object({
      email: Joi.string().email().required(),
      nick: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,32}$"))
        .required(),
      url_image: Joi.string(),
      description: Joi.string(),
    });

    const errores = { errores: [] };
    const { error } = user.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          errores.errores.push({ error: "Debes introducir un email válido." });
          break;
        case "nick":
          errores.errores.push({ error: "Debes introducir un nick." });
          break;
        case "password":
          errores.errores.push({
            error: "Debes introducir una contraseña correcta.",
          });
          break;
        case "description":
          errores.errores.push({ error: "Error en la descripción." });
          break;
      }
    }

    if (errores.errores.length !== 0) {
      res.status(400).send(errores);
      return;
    }

    next();
  }
};
