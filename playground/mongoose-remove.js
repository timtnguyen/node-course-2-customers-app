const { ObjectID } = require('mongodb'); 

const { mongoose } = require('./../server/db/mongoose');
const { Customer } = require('./../server/models/customer');
const { User } = require('./../server/models/user'); 

// Customer.remove({}).then((result) => {
//     console.log(result); 
// }); 

Customer.findByIdAndRemove('5b594e89f1734736a7001a0c').then((customer) => {
    console.log(customer); 
});

Customer.findOneAndRemove('5b594e89f1734736a7001a0c').then((customer) => {
    console.log(customer); 
}); 