const login = require('express').Router();
const axios = require('axios');

login.post('/', async (req, res, next) => {
    try {
        res.status(200).json()
    } catch (e) {
        next(e);
    }
});

module.exports = login;