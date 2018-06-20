const mongoose = require('mongoose');
const TripSchema = require('../models/trips');
const trips = require('express').Router();

trips.get('/', async (req, res, next) => {
    try {
        const docs = await TripSchema.find();
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

module.exports = trips;