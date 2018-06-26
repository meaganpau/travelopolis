const TripSchema = require('../models/Trip');
const trips = require('express').Router();

trips.get('/', async (req, res, next) => {
    try {
        const docs = await TripSchema.find().sort({date: -1});
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

trips.get('/user/:userID', async (req, res, next) => {
    const { userID } = req.params;
    try {
        await TripSchema.find({ user: userID }, (err, trip) => {
            res.status(200).json(trip);
        });
    } catch (e) {
        next(e);
    }
});

trips.get('/id/:tripID', async (req, res, next) => {
    const { tripID } = req.params;
    try {
        await TripSchema.find({ _id: tripID }, {'sort' : [[ 'date', 'asc' ]]}, (err, trip) => {
            res.status(200).json(trip);
        });
    } catch (e) {
        next(e);
    }
});

trips.get('/slug/:tripSlug', async (req, res, next) => {
    const { tripSlug } = req.params;
    try {
        await TripSchema.find({ slug: tripSlug }, {'sort' : [[ 'date', 'asc' ]]}, (err, trip) => {
            res.status(200).json(trip);
        });
    } catch (e) {
        next(e);
    }
});

module.exports = trips;