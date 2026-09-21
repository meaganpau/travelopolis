const token = require("../token")

// Requires "Authorization: Bearer <token>". On success `req.token.user.id` is the logged-in user's id.
const verifyToken = async (req, res, next) => {
    const match = /^Bearer (.+)$/.exec(req.get("authorization") || "")
    if (!match) {
        return res.status(401).json({ success: false, err: "Unauthorized" })
    }

    try {
        req.token = await token.verify(match[1])
        next()
    } catch (e) {
        res.status(401).json({ success: false, err: "Unauthorized" })
    }
}

module.exports = { verifyToken }
