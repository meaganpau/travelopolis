const login = require('express').Router();
const token = require('../token');
const User = require('../models/User');

login.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const doc = await User.findOne({ email })
        if (!doc) {
            next(new Error('not found'))
        }
        const match = await doc.comparePassword(password);
        if (match) {
            const _token = token.create(doc);
            res.status(200).send({ token: _token });
        }
        next(new Error('unauthorized'))
        res.status(200).json()
    } catch (e) {
        next(e);
    }
});

module.exports = login;