const dotenv = require('dotenv')
dotenv.config()

const dbConfig = require('../config/dbConf')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.STRING)

const db = {
    Sequelize,
    sequelize
}

db.User = require('./User')(sequelize, Sequelize)
db.Comunity = require('./Comunity')(sequelize, Sequelize)

module.exports = db
