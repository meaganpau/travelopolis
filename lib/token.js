require("dotenv").config()
const jwt = require("jsonwebtoken")
const config = require("config")

const SECRET = process.env.TOKEN_SECRET || config.TOKEN_SECRET

const create = (user) => {
    const { _id } = user
    const payload = {
        user: {
            id: _id,
        },
    }
    return jwt.sign(payload, SECRET)
}

const verify = (token) => jwt.verify(token, SECRET)

module.exports = {
    create,
    verify,
}
