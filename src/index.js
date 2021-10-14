const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const logger = require('morgan')

dotenv.config()

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

const db = require('./models')

db.sequelize.sync({force: true}).then(() => {
    app.listen(port)
    console.log(`Servidor escuchando en el puerto ${port}`);
})
