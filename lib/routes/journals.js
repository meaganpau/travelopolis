const JournalSchema = require('../models/journals');
const journals = require('express').Router();

journals.get('/tripid/:tripID', async (req, res, next) => {
    const { tripID } = req.params;
    try {
        await JournalSchema.find({ trip: tripID }, (err, journals) => {
            res.status(200).json(journals);
        });
    } catch (e) {
        next(e);
    }
});

module.exports = journals;