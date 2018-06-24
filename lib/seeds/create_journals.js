const Journal = require('../models/Journal');
const user = require('./create_users');
const trip = require('./create_trips');

const journals = [];

const journal1 = new Journal({
    title: 'First day in Italy..!',
    content: 'Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis. Donec ullamcorper nulla non metus auctor fringilla.',
    trip: trip[0],
    publishedDate: new Date('October 3, 2018'),
    slug: 'journal1'
})

const journal2 = new Journal({
    title: 'Best pizza ever!',
    content: 'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    trip: trip[0],
    publishedDate: new Date('October 7, 2018'),
    slug: 'journal2',
})

const journal3 = new Journal({
    title: 'Out in the wild',
    content: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    trip: trip[2],
    publishedDate: new Date('July 27, 2017'),
    slug: 'journal3'
})

journals.push(journal1, journal2, journal3)

module.exports = journals;