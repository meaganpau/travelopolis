const Trip = require('../models/Trip');
const user = require('./create_users');

const trips = [];

const italy2018 = new Trip({
    user: user[0],
    name: 'Italy 2018',
    slug: 'italy2018'
})

const millcroft2018 = new Trip({
    user: user[1],
    name: 'Millcroft 2018',
    journals: [],
    slug: 'millcroft2018'  
})

const algonquin2017 = new Trip({
    user: user[0],
    name: 'Algonquin 2017',
    slug: 'algonquin2017' 
})

const disney2020 = new Trip({
    user: user[0],
    name: 'Disney 2020',
    slug: 'disney2020' 
})

trips.push(italy2018, millcroft2018, algonquin2017, disney2020);

module.exports = trips;