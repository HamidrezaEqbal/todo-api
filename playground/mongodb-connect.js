const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server');
    var db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log('res is:');
    //     console.log(JSON.stringify(res, undefined, 2));
    //     console.log('res.ops is:');
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Hamidreza',
        age: 23,
        location: 'tabriz'
    }, (err, res) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        // console.log('res is:');
        // console.log(JSON.stringify(res, undefined, 2));
        // console.log('res.ops is:');
        // console.log(JSON.stringify(res.ops, undefined, 2));
        // console.log('res.ops[0] is:');
        // console.log(JSON.stringify(res.ops[0], undefined, 2));
        // console.log('res.ops[0]._id is:');
        // console.log(JSON.stringify(res.ops[0]._id, undefined, 2));
        // console.log('res.ops[0]._id.getTimestamp() is:');
        // console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
        console.log((res.ops[0]._id.getTimestamp()));
    });

    client.close();
});