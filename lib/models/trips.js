const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripScheme = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Trip = mongoose.model('trip', tripScheme);

module.exports = Trip;

