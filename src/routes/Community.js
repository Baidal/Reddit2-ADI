const communityController = require('../controllers/Community')
const authChecker = require('../utils/auth')

module.exports = (app) => {
    app.post('/api/comunidad', authChecker, communityController.createCommunity)
    app.get('/api/comunidad/:name',communityController.getCommunity)
}