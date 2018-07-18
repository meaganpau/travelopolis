const User = require('../models/User');
const users = require('express').Router();
const { verifyToken } = require('../middleware/auth');

const findByUserId = async (req, res, next) => {
    try {
        const id = req.token.user.id;
        const user = await User.findById(id);
        req.user = user;
        next();
    } catch (e) {
        next(e)
    }
}

users.get('/', verifyToken, async (req, res, next) => {
    try {
        const docs = await User.find();
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

users.get('/slug/:userSlug', async (req, res, next) => {
    const { userSlug } = req.params;

    try {
        const docs = await User.find({ slug: userSlug });
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

users.get('/id/:userID', verifyToken, async (req, res, next) => {
    const { userID } = req.params;

    try {
        const docs = await User.findById(userID);
        res.status(200).json(docs);
    } catch (e) {
        next(e);
    }
});

users.get('/current', verifyToken, findByUserId, async (req, res) => {
    res.status(200).send({ user: req.user })
})

users.post('/', async (req, res, next) => {
    const { email, password, firstName, lastName, slug } = req.body;
    const user = new User({
        email,
        password,
        firstName,
        lastName,
        slug
    })
    try {
        const newUser = await user.save();
        res.status(200).send(newUser);
      } catch (e) {
        next(e)
      }
})

module.exports = users;