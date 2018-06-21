const JournalSchema = require('../models/journals');
const journals = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId; 

journals.get('/:tripID', async (req, res, next) => {
    try {
        await JournalSchema.find({ trip: req.param.tripID }, (err, journals) => {
            res.status(200).json(journals);
        });
    } catch (e) {
        next(e);
    }
});

module.exports = journals;