const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    trip: Number,
    // author: Number,
    publishedDate: Date,
});

const Journal = mongoose.model('journal', journalSchema);

module.exports = Journal;

