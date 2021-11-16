const commentController = require('../controllers/Comment')
const authChecker = require('../utils/auth')

module.exports = (app) => {
    app.post('/api/post/:id/comentario', authChecker,commentController.createComment)
    app.post('/api/comentario/:id/voto', authChecker, commentController.voteComment)
    app.delete('/api/comentario/:id', authChecker, commentController.deleteComment)
}