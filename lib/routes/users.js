const users = require("express").Router()
const User = require("../models/User")
const { verifyToken } = require("../middleware/auth")
const { str, notFound } = require("../http")

// Public profile info. Never include email or password here.
users.get("/slug/:userSlug", async (req, res) => {
    const user = await User.findOne({ slug: req.params.userSlug })
    if (!user) return notFound(res, "User")

    const { firstName, lastName, _id, slug } = user
    res.status(200).json({ firstName, lastName, _id, slug })
})

// The logged-in user's own details (this is the only place email is returned).
users.get("/current", verifyToken, async (req, res) => {
    const user = await User.findById(req.token.user.id)
    if (!user) return res.status(401).json({ success: false, err: "Unauthorized" })

    const { email, firstName, lastName, slug, _id } = user
    res.status(200).json({ user: { email, firstName, lastName, slug, _id } })
})

// Register a new account
users.post("/", async (req, res) => {
    const { email, password, firstName, lastName, slug } = req.body
    await User.create({
        email: str(email),
        password: str(password),
        firstName: str(firstName),
        lastName: str(lastName),
        slug: str(slug),
    })

    res.status(200).json({
        user: {
            email: str(email),
            firstName: str(firstName),
            lastName: str(lastName),
            slug: str(slug),
        },
    })
})

// Update the logged-in user's own profile. Needs the current password.
users.post("/update", verifyToken, async (req, res) => {
    const { firstName, lastName, slug, password, old_password } = req.body

    const user = await User.findById(req.token.user.id)
    if (!user) return res.status(401).json({ success: false, err: "Unauthorized" })

    if (!(await user.comparePassword(old_password))) {
        return res.status(400).json({
            success: false,
            field: "old_password",
            message: "Incorrect password 🙅🏻‍♀️",
        })
    }

    if (str(firstName) !== undefined) user.firstName = firstName
    if (str(lastName) !== undefined) user.lastName = lastName
    if (str(slug) !== undefined) user.slug = slug
    if (str(password)) user.password = password // hashed in the model's save hook
    await user.save()

    res.status(200).json({
        user: { firstName: user.firstName, lastName: user.lastName, slug: user.slug },
    })
})

module.exports = users
