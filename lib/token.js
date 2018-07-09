const jwt = require('jsonwebtoken');

const SECRET = 'i am a secret';

const create = user => {
    const { _id } = user;
    const payload = {
        user: {
            id: _id
        }
    }
    return jwt.sign(payload, SECRET)
}

const verify = token => jwt.verify(token, SECRET);

module.exports = {
    create,
    verify
}