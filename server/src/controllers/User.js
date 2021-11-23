const User = require("../models").User;
const Comunidad = require("../models").Community;


module.exports = {
    async getComunidades(req, res) {
        const userId = req.params.id

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(404).send({
                errores: [{ error: `No se ha encontrado el usuario con id ${userId}` }],
              });
        }

        res.status(200).send(await user.getCommunities())
        
    }
}