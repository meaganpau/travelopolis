const login = require('express').Router();

login.get('/', (req, res) => {
    res.status(200).json({
        user: 'Default User',
        email: 'default@example.com'
    });
});

module.exports = login;