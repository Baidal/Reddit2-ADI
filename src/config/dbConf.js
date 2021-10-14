const user = process.env.USER
const pass = process.env.PASS
const db = process.env.DB
module.exports = {
    STRING: `postgres://${user}:${pass}@localhost:5432/${db}`
}