const JournalSchema = require('../models/Journal');
const journals = require('express').Router();
const Journal = require('../models/Journal')

journals.post('/', async (req, res, next) => {
    const { user, title, slug, content, trip } = req.body;
    try {
        const newJournal = new Journal({
            user,
            title,
            slug,
            content,
            trip
        })
        newJournal.save(err => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.status(201).json(newJournal);
            }
        });
    } catch (e) {
        next(e);
    }
});

journals.get('/:qty', async (req, res, next) => {
    const qty = Number(req.params.qty);
    try {
        const journals = await JournalSchema.find().limit(qty).populate({path: 'trip', populate: {path: 'user'}})
        res.status(200).json(journals);
    } catch (e) {
        next(e);
    }
});

journals.get('/id/:journalID', async (req, res, next) => {
    const { journalID } = req.params;
    try {
        const journal = await JournalSchema.findById(journalID);
        res.status(200).json(journal);
    } catch (e) {
        next(e);
    }
});

journals.get('/slug/:journalSlug', async (req, res, next) => {
    const { journalSlug } = req.params;
    try {
        const journal = await JournalSchema.find({slug: journalSlug });
        res.status(200).json(journal);
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