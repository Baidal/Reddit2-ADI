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
      description: Joi.string()
    });

    const errors = {errors: []}
    const {error} = user.validate(req.body)

    if(error) {
      switch (error.details[0].context.key) {
        case 'email':
          errors.errors.push({error: "Debes introducir un email válido."})
          break;
        case 'nick':
          errors.errors.push({error: "Debes introducir un nick."})
          break;
        case 'password':
          errors.errors.push({error: "Debes introducir una contraseña correcta."})
          break;
        case 'description':
          errors.errors.push({error: "Error en la descripción."})
          break;
      }
    }

    if(errors.errors.length !== 0){
      res.status(400).send(errors)
      return
    }

    next()
  },
};
