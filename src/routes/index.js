
/** 
 * Defines all the routes used in the app
 * @param {Express} app 
 */
module.exports = (app) => {
    require('./Auth')(app)
    require('./Community')(app)
}