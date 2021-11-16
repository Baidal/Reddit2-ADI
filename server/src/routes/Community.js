const communityController = require('../controllers/Community')
const authChecker = require('../utils/auth')

module.exports = (app) => {
    app.post('/api/comunidad', authChecker, communityController.createCommunity)
    app.get('/api/comunidad/:name',communityController.getCommunity)
    app.post('/api/comunidad/usuario/:name', authChecker, communityController.followCommunity)
    app.patch('/api/comunidad/:name', authChecker, communityController.updateCommunity)
}