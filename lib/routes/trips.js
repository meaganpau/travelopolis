const TripSchema = require('../models/Trip');
const JournalSchema = require('../models/Journal');
const trips = require('express').Router();
const { verifyToken } = require('../middleware/auth');

// Add headers to requests
trips.post('/', verifyToken, async (req, res, next) => {
    const { user, name, slug } = req.body;
    try {
        const newTrip = new TripSchema({
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

trips.post('/id', verifyToken, async (req, res, next) => {
    const { name, slug, tripID } = req.body;
    try {
        TripSchema.update({ _id: tripID }, { $set: { name, slug }}, (err, trip) => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate slug
                    return res.status(500).send({ success: false, field: 'slug', message: 'That slug is already in use. 😫'})
                }
                return res.status(500).send(err)
            } else {
                return res.status(201).json(trip);
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

trips.get('/id/:tripID', verifyToken, async (req, res, next) => {
    const { tripID } = req.params;
    try {
        const trip = await TripSchema.findById(tripID).populate('user', 'slug');
        res.status(200).json(trip);
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

trips.delete('/delete/:tripID', verifyToken, async (req, res, next) => {
    const { tripID } = req.params;
    try {
        const trip = await TripSchema.findByIdAndRemove(tripID);
        const journal = await JournalSchema.deleteMany({ trip: tripID });
        res.status(200).json({trip, journal});
    } catch (e) {
        next(e);
    }
});

module.exports = trips;