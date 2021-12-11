const UserController = require('../controllers/User')
const authChecker = require('../utils/auth')

module.exports = (app) => {
    app.get('/api/usuario/:id/comunidades', UserController.getCommunities)
    app.get('/api/usuario/comunidades/posts',authChecker, UserController.getRelatedPosts)
    app.get('/api/usuario/:name', UserController.getUser)
    app.patch('/api/usuario', authChecker, UserController.updateUser)
}