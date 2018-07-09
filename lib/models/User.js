const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const validateEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    slug: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash;
            next();
        } catch (e) {
            next(e)
        }
    }
    next();
})

userSchema.methods.comparePassword = function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;

