const login = require("express").Router()
const token = require("../token")
const User = require("../models/User")
const { str } = require("../http")

login.post("/", async (req, res) => {
    const email = str(req.body.email)
    const password = str(req.body.password)

    // Same answer for "no such user" and "wrong password", so emails can't be probed.
    const fail = () => res.status(401).json({ err: "Incorrect email or password." })

    if (!email || !password) return fail()

    const user = await User.findOne({ email: email.trim().toLowerCase() })
    if (!user || !(await user.comparePassword(password))) return fail()

    res.status(200).json({ token: await token.create(user) })
})

module.exports = login
