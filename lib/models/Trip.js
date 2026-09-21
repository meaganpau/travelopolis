const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tripSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
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

module.exports = mongoose.model("Trip", tripSchema)
