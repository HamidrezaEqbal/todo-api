"use strict";

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    // const userObject = user.toObject();
    return _.pick(user, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123');
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        return Promise.reject();
    }
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredientials = function (email, password) {
    const User = this;
    return User.findOne({
        email
    }).then((user) => {
        if (!user) {
            return Promise.reject();
        } else {
            return bcrypt.compare(password, user.password).then((success) => {
                if (success) {
                    return user;
                } else {
                    return Promise.reject();
                }
            });
        }
    });
};

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};