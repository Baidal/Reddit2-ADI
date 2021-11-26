const User = require("../models").User;
const Community = require('../models').Community

const jwt = require("jwt-simple");
const jwtConfig = require("../config/jwtConf");
const internalError = require('../utils/internalError')

const { Op } = require("sequelize");

const comparePasswords = require('../utils/checkPassword').comparePasswords

module.exports = {
  async register(req, res) {
    try {
      const { nick, email } = req.body;
      const errores = { errores: [] };

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
          errores.errores.push({ error: "El email introducido ya existe." });

        if (userAlreadyLogged.nick === nick)
          errores.errores.push({ error: "El nick introducido ya existe." });

        res.status(400).send(errores);
        return;
      }

      let urlImage = ""
      let absolutePath = ""
      let relativePath = ""

      /**
       * Guardamos la informacion de la imagen de perfil del usuario
       */
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

      relativePath = relativePath.substring(7, relativePath.length);

      const new_user = await User.create({...req.body, url_image: relativePath});
      res.status(201).send({ new_user });
    } catch (e) {
      internalError(res, e, 'register', 'Auth')
    }
  },
  async login(req, res) {
    try {
      const { nickEmail, password } = req.body;

      const errores = {errores: []}

      if(!nickEmail)
        errores.errores.push({error: "Debes introducir el nick o el email del usuario."})
      
      if(!password) 
        errores.errores.push({error: "Debes introducir la contraseña."})
      
      if(errores.errores.length > 0){
        res.status(400).send(errores)
        return
      }

      const user = await User.findOne({
        where: {
          [Op.or]: [
            {email: nickEmail},
            {nick: nickEmail}
          ]
        }
      });

      //Encontramos al usuario
      if(user) {
        //el usuario ha introducido la contraseña correcta
        if(await comparePasswords(password, user.password)) {
          const token = jwt.encode(user, jwtConfig.SECRET)
          user.dataValues.numCommunities = await user.countCommunities()

          res.status(200).send({
            user,
            token
          })
        } else {
          res.status(404).send({
            errores: [
              {error: "Usuario no encontrado en el sistema o contraseña incorrecta."}
            ]
          })
        }
      } else{
        res.status(404).send({
          errores: [
            {error: "Usuario no encontrado en el sistema o contraseña incorrecta."}
          ]
        })
      }
    } catch (e) {
      internalError(res, e, 'login', 'Auth')
    }
  },
};
