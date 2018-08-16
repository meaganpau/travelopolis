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
    const { email, firstName, lastName, slug, _id } = req.user;
    res.status(200).send({ 
        user: {
            email,
            firstName,
            lastName,
            slug,
            _id
        }
    })
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
        await user.save(err => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate email
                    return res.status(500).send({ success: false, field: 'email', message: 'That email already exists!'})
                }
                return res.status(500).send(err)
            }
            res.status(200).json({ 
                user: {
                    email,
                    firstName,
                    lastName,
                    slug,
                }
            });
        });
      } catch (e) {
        next(e)
      }
})

users.post('/update', async (req, res, next) => {
    const { email, password, firstName, lastName, slug, _id, old_password } = req.body;
    try {
        const doc = await User.findById(_id);
        if (!doc) {
            next(new Error('User not found'))
        }
        const match = await doc.comparePassword(old_password);
        if (match) {
            User.findOneAndUpdate( { _id: _id }, { email, password, firstName, lastName, slug }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    res.status(201).json(User);
                }
            });
        } else {
            next(new Error('Invalid password'))
        }
      } catch (e) {
        next(e)
      }
})

module.exports = users;