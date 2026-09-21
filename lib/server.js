const { PORT, MONGODB_URI } = require("./settings")
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const routes = require("./routes/route")

const app = express()
app.disable("x-powered-by")

// Treat any { $operator: ... } in a query filter as a plain value, so user input can't inject queries.
mongoose.set("sanitizeFilter", true)

app.use(express.json())

app.use("/", express.static(path.join(__dirname, "../build")))

app.use("/api", routes)
app.use("/api", (req, res) => {
    res.status(404).json({ success: false, message: "Not found" })
})

// Anything else is the React app (client-side routing).
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

const DUPLICATE_MESSAGES = {
    email: "That email already exists!",
    slug: "That slug is already in use. 😫",
}

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err)

    // Duplicate value in a unique field (email, slug)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0]
        return res.status(409).json({
            success: false,
            field,
            message: DUPLICATE_MESSAGES[field] || "That value is already in use.",
        })
    }

    if (err.name === "ValidationError") {
        const [field] = Object.keys(err.errors)
        return res.status(400).json({
            success: false,
            field,
            message: err.errors[field].message,
        })
    }

    // e.g. a malformed id in the URL
    if (err.name === "CastError") {
        return res.status(400).json({ success: false, message: "Invalid request" })
    }

    // Bad JSON bodies and similar errors raised by Express itself
    if (err.status >= 400 && err.status < 500) {
        return res.status(err.status).json({ success: false, message: err.message })
    }

    console.error(err)
    res.status(500).json({ success: false, err: "Something went wrong" })
})

const start = async () => {
    if (!MONGODB_URI) {
        console.error("MONGODB_URI is not set. Set it in .env (see README.md).")
        process.exit(1)
    }

    try {
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    } catch (err) {
        console.error(`Could not connect to MongoDB: ${err.message}`)
        process.exit(1)
    }

    // Log where we connected, but never the full URI (it can contain a password).
    const { host, port, name } = mongoose.connection
    console.log(`Connected to MongoDB (${host}:${port}/${name})`)

    app.listen(PORT, (err) => {
        if (err) {
            console.error(`Could not listen on port ${PORT}: ${err.message}`)
            process.exit(1)
        }
        console.log(`Listening on port ${PORT}`)
    })
}

start()
