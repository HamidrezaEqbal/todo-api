const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {
    mongoose
} = require('./db/mongoose');

const {
    User
} = require('./models/user');
const {
    Todo
} = require('./models/todo');

const {
    ObjectID
} = require('mongodb');

// to solve DeprecationWarning:
mongoose.set('useFindAndModify', false);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save().then((savedDoc) => {
        res.send(savedDoc);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        });
    }).catch((err) => {
        res.status(400).send();
    });

    // Todo.findOneAndDelete({
    //     _id: id
    // }).then((todo) => {
    //     if (!todo) {
    //         return res.status(404).send();
    //     }
    //     res.send({
    //         todo
    //     });
    // }).catch((err) => {
    //     res.status(400).send();
    // });

});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    var body = _.pick(req.body, ['text', 'completed'])
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        });
    }).catch((err) => {
        res.send(400).send();
    });
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

module.exports = {
    app
};