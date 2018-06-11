const trips = require('express').Router();

trips.get('/', (req, res) => {
    res.status(200).json({
        message: 'Trips!'
    });
});

module.exports = trips;