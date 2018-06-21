const User = require('../models/users');

const user1 = new User({
    firstName: 'Meagan',
    lastName: 'Pau',
    email: 'meagan.pau@gmail.com',
    slug: 'user1'
})

const user2 = new User({
    firstName: 'Buffy',
    lastName: 'Summers',
    email: 'meagan.pau@crowdlinker.com',
    slug: 'buffy-summers'
})

const user3 = new User({
    firstName: 'Buster',
    lastName: 'Baxter',
    email: 'map_1115@hotmail.com',
    slug: 'bunnybuster'
})

module.exports = async () => {
    try {
        await User.remove({});
        const promises = [
            user1.save(),
            user2.save(),
            user3.save(),
        ];
        const [output1, output2, output3] = await Promise.all(promises);
    } catch (err) {
        console.log(err);
    }
}