const routes = require('express').Router();
const trips = require('./trips');
const login = require('./login');

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

routes.use('/api', routes);
routes.use('/trips', trips);
routes.use('/login', login);

module.exports = routes;