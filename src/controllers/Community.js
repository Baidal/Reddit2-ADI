const Community = require("../models").Community;
const Post = require("../models").Post

module.exports = {
  async createCommunity(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        res.status(400).send({
          errores: [{ error: "No se ha introducido el nombre" }],
        });
        return;
      }

      const existent_community = await Community.findOne({where: {name}})

      if(existent_community) {
        res.status(400).send({
          errores: [{ error: "El nombre de la comunidad ya está en uso" }],
        });
        return;
      }

      const new_community = await Community.create({ name, description, UserId: res.locals.user.id });
      new_community.dataValues.posts = []

      res.status(201).send(new_community);
    } catch (e) {
      console.log(
        "Se ha producido un error en 'register' del controlador 'Community': \n" + e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });
    }
  },
  async getCommunity(req, res){
    const name = req.params.name
    
    const community = await Community.findOne({where: {name: name}, include: Post})
    const usersFollowing =  await community.getUsers()
    
    community.dataValues.numFollowers = usersFollowing.length
    res.status(200).send(community)
  }
};
