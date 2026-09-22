const mongoose = require("mongoose")
const { MONGODB_URI } = require("./settings")

// Reuses the MongoDB connection across invocations. On Vercel, a serverless
// function instance can stay "warm" and handle multiple requests, so
// without this, every request that hit a cold path would open a brand new
// connection and could exhaust Atlas's connection limit. Locally this just
// means we connect once at startup, same as before this refactor.
let cached = global._mongooseConn
if (!cached) {
    cached = global._mongooseConn = { conn: null, promise: null }
}

async function connectToDatabase() {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not set. Set it in .env (see README.md).")
    }

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
            .then((mongooseInstance) => {
                const { host, port, name } = mongooseInstance.connection
                console.log(`Connected to MongoDB (${host}:${port}/${name})`)
                return mongooseInstance
            })
    }

    try {
        cached.conn = await cached.promise
    } catch (err) {
        // Let the next call retry instead of getting stuck on a failed promise.
        cached.promise = null
        throw err
    }

    return cached.conn
}

module.exports = { connectToDatabase }
