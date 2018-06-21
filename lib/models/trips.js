const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripScheme = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    journals: Array,
    slug: {
        type: String,
        unique: true,
        trim: true
    }
});

const Trip = mongoose.model('trip', tripScheme);

module.exports = Trip;

