const {
    mongoose
} = require('./../server/db/mongoose');

const {
    User
} = require('./../server/models/user');

const {
    ObjectID
} = require('mongodb');

const id = '4b98f9b1e8572d1f3c98e0d6'

// console.log(ObjectID.isValid(id));

User.find({
    _id: id
}).then((res) => {
    console.log(res);
}, (err) => {
    console.log('invalid id');
});

User.findOne({
    _id: id
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log('invalid id');
});

User.findById(id).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log('invalid id');
})