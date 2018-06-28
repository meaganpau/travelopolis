const UserSchema = require('../models/User');
const users = require('express').Router();

users.get('/', async (req, res, next) => {
    try {
        const docs = await UserSchema.find();
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

users.get('/slug/:userSlug', async (req, res, next) => {
    const { userSlug } = req.params;

    try {
        const docs = await UserSchema.find({ slug: userSlug });
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

users.get('/id/:userID', async (req, res, next) => {
    const { userID } = req.params;

    try {
        const docs = await UserSchema.findById(userID);
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

module.exports = users;