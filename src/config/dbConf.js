const user = process.env.USER
const pass = process.env.PASS
const db = process.env.DB

const user_test = process.env.USER_TEST
const db_test = process.env.DB_TEST
const pass_test = process.env.PASS_TEST 


module.exports = getDbString = (test) => {
    return test ? `postgres://${user_test}:${pass_test}@localhost:5432/${db_test}` : `postgres://${user}:${pass}@localhost:5432/${db}`
}