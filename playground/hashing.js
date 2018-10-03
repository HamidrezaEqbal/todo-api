require('./../server/config/config');
const {
    SHA256
} = require('crypto-js');
const {
    User
} = require('./../server/models/user');


const jwt = require('jsonwebtoken');

const {
    mongoose
} = require('./../server/db/mongoose')
const {
    ObjectID
} = require('mongodb');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);





const body = {
    email: 'hamid6@example.com',
    password: 'dcd@*l3521'
}

const user = new User(body);
const access = 'auth';
const token = jwt.sign({
    _id: user._id.toHexString(),
    access
}, 'abc123');
console.log(typeof (token));
// user.tokens.push(token);





// const d = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXNkIjoiYXNmYWt1aGYifQ.GO1tXwxqkt5Hv3rc0eCbtQmstQp-oExjpnm1TS2gaI4', 'hamid');
// console.log(d);
// const data = {
//     name: ' salaaam'
// }
// const token = jwt.sign(data, 'hamidreza');


// const user = new User(body);
// user.email = 'two@ds.com'
// user._id = new ObjectID('5bb4c00d635b9b1ba00b053b');

// user.tokens.push({
//     access: 'auth',
//     token: 'sdasd'
// });
// user.save().then((ss) => {
//     console.log('ss is:', ss);
// }).catch((e) => {
//     console.log('e is:', e);
// });
// console.log(user);




// user.save().then((res) => {
//     console.log('res is:', res);
//     user.tokens.push({
//         access: 'auth',
//         token: 'sdasd'
//     });
//     return user.save();
// }).then((ss) => {
//     console.log('ss is:', ss);
// }).catch((e) => {
//     console.log('e is:', e);
// });