const mongoose = require("mongoose")
const { MONGODB_URI } = require("../settings")
const Trip = require("../models/Trip")
const Journal = require("../models/Journal")
const User = require("../models/User")
const users = require("./create_users")
const trips = require("./create_trips")
const journals = require("./create_journals")

// Seeding wipes users, trips and journals. Only allow it on a local database,
// so it can never be pointed at production by accident.
const LOCAL_URI = /^mongodb:\/\/(?:[^@/]*@)?(?:127\.0\.0\.1|localhost|\[::1\])(?::\d+)?(?:[/?]|$)/

const makeSeeds = async () => {
    if (!MONGODB_URI) {
        console.error("MONGODB_URI is not set. Set it in .env (see README.md).")
        process.exit(1)
    }
    if (!LOCAL_URI.test(MONGODB_URI) && process.env.SEED_ALLOW_REMOTE !== "true") {
        console.error(
            "Refusing to seed: MONGODB_URI is not a local database.\n" +
                "Seeding deletes all users, trips and journals. " +
                "If you really mean it, run with SEED_ALLOW_REMOTE=true."
        )
        process.exit(1)
    }

    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    try {
        await Promise.all([User.deleteMany(), Journal.deleteMany(), Trip.deleteMany()])
        await Promise.all(users.map((user) => user.save()))
        await Promise.all(trips.map((trip) => trip.save()))
        await Promise.all(journals.map((journal) => journal.save()))
        console.log(`Seeded ${users.length} users, ${trips.length} trips, ${journals.length} journals.`)
    } finally {
        await mongoose.disconnect()
    }
}

makeSeeds().catch((err) => {
    console.error(err.message)
    process.exit(1)
})
