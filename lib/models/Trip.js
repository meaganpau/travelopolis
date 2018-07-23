const mongoose = require('mongoose');
const Journal = require('./Journal');
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
    date: {
        type: Date,
        default: new Date(),
    },
    slug: {
        type: String,
        unique: true,
        trim: true
    }
});

const Trip = mongoose.model('Trip', tripScheme);

module.exports = Trip;

