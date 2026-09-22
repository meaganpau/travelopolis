// Vercel serverless entry point. Vercel serves the CRA build/ folder itself
// (see vercel.json), so this only needs to handle /api requests — the
// static-file serving and SPA catch-all in lib/app.js are skipped here via
// `serveStatic: false`. Env vars (MONGODB_URI, TOKEN_SECRET) come from
// Vercel's Project Settings, not a .env file.
const { createApp } = require("../lib/app")
const { connectToDatabase } = require("../lib/db")

const app = createApp({ serveStatic: false })

module.exports = async (req, res) => {
    try {
        await connectToDatabase()
    } catch (err) {
        console.error(`Could not connect to MongoDB: ${err.message}`)
        res.status(500).json({ success: false, message: "Database connection failed" })
        return
    }
    app(req, res)
}
