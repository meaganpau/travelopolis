const User = require('../models/User');

const users = [];

const user1 = new User({
    firstName: 'Meagan',
    lastName: 'Pau',
    email: 'meagan.pau@gmail.com',
    slug: 'user1',
    password: 'testing'
})

const user2 = new User({
    firstName: 'Buffy',
    lastName: 'Summers',
    email: 'meagan.pau@crowdlinker.com',
    slug: 'buffy-summers',
    password: 'testing'
})

const user3 = new User({
    firstName: 'Buster',
    lastName: 'Baxter',
    email: 'map_1115@hotmail.com',
    slug: 'bunnybuster',
    password: 'testing'
})

users.push(user1, user2, user3)

module.exports = users;