const communityController = require('../controllers/Community')
const authChecker = require('../utils/auth')

module.exports = (app) => {
    app.get('/api/comunidad/:name',communityController.getCommunity)
    app.get('/api/comunidad/:name/seguidores',communityController.getCommunityFollowers)
    app.get('/api/comunidades', communityController.getCommunities)
    app.get('/api/comunidad/nombre/:name', communityController.searchCommunity)
    app.post('/api/comunidad', authChecker, communityController.createCommunity)
    app.get('/api/comunidad/:name/usuario', authChecker, communityController.userFollowsCommunity)
    app.post('/api/comunidad/usuario/:name', authChecker, communityController.followCommunity)
    app.patch('/api/comunidad/:name', authChecker, communityController.updateCommunity)
}