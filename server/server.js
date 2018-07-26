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

        res.status(200).send(customer);
    }).catch((err) => {
        res.status(400).send(); 
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`); 
});


module.exports = {app}; 

