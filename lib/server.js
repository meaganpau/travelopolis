const { createApp } = require("./app")
const { connectToDatabase } = require("./db")
const { PORT } = require("./settings")

async function start() {
    try {
        await connectToDatabase()
    } catch (err) {
        console.error(`Could not connect to MongoDB: ${err.message}`)
        process.exit(1)
    }

    const app = createApp()

    app.listen(PORT, (err) => {
        if (err) {
            console.error(`Could not listen on port ${PORT}: ${err.message}`)
            process.exit(1)
        }
        console.log(`Listening on port ${PORT}`)
    })
}

start()
