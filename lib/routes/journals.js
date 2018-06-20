const JournalSchema = require('../models/journals');
const journals = require('express').Router();

journals.get('/', async (req, res, next) => {
    try {
        const docs = await JournalSchema.find();
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

module.exports = journals;