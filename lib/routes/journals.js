const JournalSchema = require('../models/Journal');
const journals = require('express').Router();

journals.get('/slug/:journalSlug', async (req, res, next) => {
    const { journalSlug } = req.params;
    try {
        const doc = await JournalSchema.find({slug: journalSlug });
        res.status(200).json(doc);
    } catch (e) {
        next(e);
    }
});

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