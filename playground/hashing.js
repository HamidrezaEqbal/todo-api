const {
    SHA256
} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const pass = 'hamidreza';
bcrypt.genSalt(10, (err, salt) => {
    console.log('salt is:', salt);
    bcrypt.hash(pass, salt, (err, hash) => {
        console.log('hash is:', hash);
    });
});