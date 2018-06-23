const Journal = require('../models/journals');
var mongoose = require('mongoose');

const journal1 = new Journal({
    title: 'First day in Italy..!',
    content: 'Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis. Donec ullamcorper nulla non metus auctor fringilla.',
    trip: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc82c"),
    author: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc832"),
    publishedDate: new Date('October 3, 2018'),
    slug: 'journal1'
})

const journal2 = new Journal({
    title: 'Best pizza ever!',
    content: 'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    trip: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc82c"),
    author: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc832"),
    publishedDate: new Date('October 7, 2018'),
    slug: 'journal2',
})

const journal3 = new Journal({
    title: 'Out in the wild',
    content: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    trip: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc82e"),
    author: mongoose.Types.ObjectId("5b2d1652ae7d9f85206bc833"),
    publishedDate: new Date('July 27, 2017'),
    slug: 'journal3'
})

module.exports = async () => {
    try {
        await Journal.remove({});
        const promises = [
            journal1.save(),
            journal2.save(),
            journal3.save(),
        ];
        const [output1, output2, output3] = await Promise.all(promises);
    } catch (err) {
        console.log(err);
    }
}