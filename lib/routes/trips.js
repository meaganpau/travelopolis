const TripSchema = require('../models/Trip');
const trips = require('express').Router();
const Trip = require('../models/Trip')

trips.post('/', async (req, res, next) => {
    const { user, name, slug } = req.body;
    try {
        const newTrip = new Trip({
            user,
            name,
            slug
        })
        newTrip.save(err => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.status(201).json(newTrip);
            }
        });
    } catch (e) {
        next(e);
    }
});

trips.get('/', async (req, res, next) => {
    try {
        const trips = await TripSchema.find().sort({date: -1});
        res.status(200).json(trips);
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
        await TripSchema.findById(tripID, (err, trip) => {
            res.status(200).json(trip);
        });
    } catch (e) {
        next(e);
    }
});

trips.get('/slug/:tripSlug', async (req, res, next) => {
    const { tripSlug } = req.params;
    try {
        await TripSchema.find({ slug: tripSlug }, (err, trip) => {
            res.status(200).json(trip);
        });
    } catch (e) {
        next(e);
    }
});

module.exports = trips;