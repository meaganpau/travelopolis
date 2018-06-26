const routes = require('express').Router();
const trips = require('./trips');
const journals = require('./journals');
const login = require('./login');
const users = require('./users');

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

routes.use('/trips', trips);
routes.use('/journals', journals);
routes.use('/login', login);
routes.use('/users', users);

module.exports = routes;