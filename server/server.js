let env = process.env.NODE_ENV || 'development'; 
console.log('env *****', env); 

if (env === 'development') {
    process.env.PORT = 3000; 
    process.env.MONGODB_URI = 'mongodb://localhost:27017/CustomerApp';
} else if (env === 'test') {
    process.env.PORT = 3000; 
    process.env.MONGODB_URI = 'mongodb://localhost:27017/CustomerAppTest'; 
}

const _ = require('lodash'); 
const express = require('express');
const bodyParser = require('body-parser'); 
const { ObjectID } = require('mongodb'); 

const { mongoose } = require('./db/mongoose');
const { Customer } = require('./models/customer');
const { User } = require('./models/user'); 

var app = express(); 
const port = process.env.PORT || 3000; 

// Middleware to convert json into object 
app.use(bodyParser.json()); 

// POST route 
app.post('/customers', (req, res) => {
    let customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        completed: req.body.completed,
        completedAt: req.body.completedAt 
    });

    customer.save().then((doc) => {
        res.send(doc);  
    }, (err) => {
        res.status(400).send(err); 
    });
});

// GET route 
app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.send({customers}); 
    }, (err) => {
        res.status(400).send(err); 
    });
});

// GET /customers/:id 
app.get('/customers/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); 
    }

    Customer.findById(id).then((customer) => {
        if (!customer) {
            res.status(404).send(); 
        }

        res.send({customer}); 
    }).catch((err) => {
        res.status(400).send(); 
    }); 
}); 

app.delete('/customers/:id', (req, res) => {
    let id = req.params.id; 

    if (!ObjectID.isValid(id)) {
        return res.status(404).send(); 
    }

    Customer.findByIdAndRemove(id).then((customer) => {
        if (!customer) {
            return res.status(404).send(); 
        }

        res.status(200).send({customer});
    }).catch((err) => {
        res.status(400).send(); 
    });
});

app.patch('/customers/:id', (req, res) => {
    let id = req.params.id; 
    // Using lodash 
    let body = _.pick(req.body, ['completed', 'completedAt']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send(); 
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime(); 
    } else {
        body.completed = false;
        body.completedAt = null; 
    }

    Customer.findByIdAndUpdate(id, {$set: body}, {new: true}).then((customer) => {
        if (!customer) {
            return res.status(404).send(); 
        }

        res.send({customer}); 
    }).catch((err) => {
        res.status(400).send(); 
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`); 
});


module.exports = {app}; 

