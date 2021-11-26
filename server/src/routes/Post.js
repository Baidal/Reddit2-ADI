const postController = require('../controllers/Post')
const authChecker = require('../utils/auth')

module.exports = (app) => {
    app.get('/api/post/:id', postController.getPost)
    app.get('/api/posts', postController.getPosts)
    app.post('/api/comunidad/:com_name/post',authChecker,postController.createPost)
    app.post('/api/post/:id/voto', authChecker ,postController.votePost)
    app.delete('/api/post/:id', authChecker, postController.deletePost)
}