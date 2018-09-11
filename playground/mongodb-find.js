// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server');
    var db = client.db('TodoApp');
    db.collection('Users').find().count().then((c) => {
        console.log(c);
    }).catch((err) => {
        console.log(err);
    })

    client.close();
});