const UserController = require('../controllers/User')

module.exports = (app) => {
    app.get('/api/usuario/:id/comunidades', UserController.getComunidades)
}