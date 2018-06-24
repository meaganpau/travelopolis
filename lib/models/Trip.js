const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripScheme = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    // journals: Array,
    slug: {
        type: String,
        unique: true,
        trim: true
    }
});

const Trip = mongoose.model('Trip', tripScheme);

module.exports = Trip;

