const User = require("../models").User;
const jwt = require("jwt-simple");
const jwtConfig = require("../config/jwtConf");
const internalError = require('../utils/internalError')

const { Op } = require("sequelize");

const comparePasswords = require('../utils/checkPassword').comparePasswords

module.exports = {
  async register(req, res) {
    try {
      const { nick, email } = req.body;
      const errors = { errors: [] };

      const userAlreadyLogged = await User.findOne({
        where: {
          [Op.or]: [
            {
              nick: nick,
            },
            {
              email: email,
            },
          ],
        },
      });

      if (userAlreadyLogged) {
        if (userAlreadyLogged.email === email)
          errors.errors.push({ error: "El email introducido ya existe." });

        if (userAlreadyLogged.nick === nick)
          errors.errors.push({ error: "El nick introducido ya existe." });

        res.status(400).send(errors);
        return;
      }

      let urlImage = ""
      let absolutePath = ""
      let relativePath = ""

      if(req.files && req.files.profileImage) {
        const profileImage = req.files.profileImage
        
        absolutePath = process.cwd()
        relativePath = '/public/uploads/profiles/' + nick + "." + profileImage.mimetype.split("/")[1]
        
        urlImage = absolutePath + relativePath 

        profileImage.mv(urlImage, (err) => {
          if(err)
            return internalError(res, err, 'uploadFile', 'Auth')

        })
      }

      const new_user = await User.create({...req.body, url_image: relativePath});
      res.status(201).send({ new_user });
    } catch (e) {
      internalError(res, e, 'register', 'Auth')
    }
  },
  async login(req, res) {
    try {
      const { nickEmail, password } = req.body;

      const errors = {errors: []}

      if(!nickEmail)
        errors.errors.push({error: "Debes introducir el nick o el email del usuario."})
      
      if(!password) 
        errors.errors.push({error: "Debes introducir la contraseña."})
      
      if(errors.errors.length > 0){
        res.status(400).send(errors)
        return
      }

      const user = await User.findOne({
        where: {
          [Op.or]: [
            {email: nickEmail},
            {nick: nickEmail}
          ]
        },
      });

      //Encontramos al usuario
      if(user) {
        //el usuario ha introducido la contraseña correcta
        if(await comparePasswords(password, user.password)) {
          const token = jwt.encode(user, jwtConfig.SECRET)
          res.status(200).send({
            user,
            token
          })
        } else {
          res.status(400).send({
            errors: [
              {error: "Usuario no encontrado en el sistema o contraseña incorrecta."}
            ]
          })
        }
      } else{
        res.status(400).send({
          errors: [
            {error: "Usuario no encontrado en el sistema o contraseña incorrecta."}
          ]
        })
      }
    } catch (e) {
      internalError(res, e, 'login', 'Auth')
    }
  },
};
