const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: String,
    trip: Number,
    // author: Number,
    publishedDate: Date,
    // slug: {
    //     type: String,
    //     unique: true,
    //     trim: true
    // }
});

const Journal = mongoose.model('journal', journalSchema);

module.exports = Journal;

