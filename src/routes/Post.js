const postController = require('../controllers/Post')
const authChecker = require('../utils/auth')

module.exports = (app) => {
    app.get('/api/post/:id', postController.getPost)
    app.post('/api/comunidad/:com_name/post',authChecker,postController.createPost)
    app.post('/api/post/:id/vote', authChecker ,postController.votePost)
}