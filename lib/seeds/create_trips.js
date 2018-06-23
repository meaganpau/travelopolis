const Trip = require('../models/trips');
var mongoose = require('mongoose');

const italy2018 = new Trip({
    user: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc832"),
    name: 'Italy 2018',
    journals: [mongoose.Types.ObjectId("5b2c04a52485b1570a494e65"), mongoose.Types.ObjectId("5b2c04a52485b1570a494e66")],
    slug: 'italy2018'
})

const millcroft2018 = new Trip({
    user: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc833"),
    name: 'Millcroft 2018',
    journals: [],
    slug: 'millcroft2018'  
})

const algonquin2017 = new Trip({
    user: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc832"),
    name: 'Algonquin 2017',
    journals: [mongoose.Types.ObjectId("5b2c04a52485b1570a494e66")],
    slug: 'algonquin2017' 
})

module.exports = async () => {
    try {
        await Trip.remove({});
        const promises = [
            italy2018.save(),
            millcroft2018.save(),
            algonquin2017.save(),
        ];
        const [output1, output2, output3] = await Promise.all(promises);
    } catch (err) {
        console.log(err);
    }
}