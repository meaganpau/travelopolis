const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: String,
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    },
    publishedDate: Date,
    slug: {
        type: String,
        unique: true,
        trim: true
    }
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;

