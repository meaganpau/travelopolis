const mongoose = require("mongoose")
const Schema = mongoose.Schema

const journalSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: String,
    trip: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
    },
})

module.exports = mongoose.model("Journal", journalSchema)
