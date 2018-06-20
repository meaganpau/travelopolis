const Trip = require('../models/trips');

const italy2018 = new Trip({
    name: 'Italy 2018',
    journals: [1, 2]    
})

const millcroft2018 = new Trip({
    name: 'Millcroft 2018',
    journals: []    
})

const algonquin2017 = new Trip({
    name: 'Algonquin 2017',
    journals: [3]    
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