require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const routes = require("./routes/route")
const app = express()
const config = require("config")

const PORT = process.env.PORT || config.PORT
const MONGOOSE_URI = process.env.MONGODB_URI || config.MONGODB_URI

app.use(bodyParser.json())

app.use("/", express.static(path.join(__dirname, "../build")))

app.use("/api", routes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`)
    await mongoose
        .connect(MONGOOSE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log(`Successfully connected to ${MONGOOSE_URI}`)
        })
        .catch((err) => console.log(err.message))
})

app.use((err, req, res, next) => {
    res.status(500).json({ err: err.toString() })
})
