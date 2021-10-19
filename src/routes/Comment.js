const commentController = require('../controllers/Comment')
const authChecker = require('../utils/auth')

module.exports = (app) => {
    app.post('/api/post/:id/comment', authChecker,commentController.createComment)
}