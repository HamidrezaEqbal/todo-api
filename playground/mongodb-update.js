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
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b97dc57cd2364260646a296')
    }, {
        $set: {
            name: 'Ali'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });

    client.close();
});