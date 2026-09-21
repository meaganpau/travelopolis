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
        required: true
    }
});

// Hash the password whenever it is set or changed (never store it as plain text).
userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

userSchema.methods.comparePassword = async function(password) {
    if (!this.password || typeof password !== 'string') return false
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;

