const AuthController = require('../controllers/Auth')
const UserValidator = require('../models/Validators/UserValidator')

module.exports = (app) => {
    app.post('/api/register', UserValidator.registerValidations,AuthController.register)
    app.post('/api/login')

}