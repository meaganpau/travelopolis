const login = require('express').Router();

login.get('/', async (req, res, next) => {
    try {
        //FIX THIS
        const res = await axios.get('/users');
        res.status(200).json(res.data[0])
    } catch (e) {
        next(e);
    }
});

module.exports = login;