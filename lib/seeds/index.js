const Trip = require('../models/Trip');
const Journal = require('../models/Journal');
const User = require('../models/User');
const users = require('./create_users');
const trips = require('./create_trips');
const journals = require('./create_journals');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/tripJournals';

const truncateDatabase = async () => {
    return Promise.all([User.deleteMany(), Journal.deleteMany(), Trip.deleteMany()])
}

const makeSeeds = async () => {
    await mongoose.connect(uri);

    await truncateDatabase();

    await Promise.all(users.map(user => user.save()))
    
    await Promise.all(trips.map(trip => trip.save()))
    
    await Promise.all(journals.map(journal => journal.save()))
    
    mongoose.connection.close();
}

makeSeeds();