const express = require('express');
const bodyParser = require('body-parser'); 

const { mongoose } = require('./db/mongoose');
const { Customer } = require('./models/customer');
const { User } = require('./models/user'); 

var app = express(); 

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

app.listen(3000, () => {
    console.log('Started on port 3000'); 
});




