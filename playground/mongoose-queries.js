const { ObjectID } = require('mongodb'); 

const { mongoose } = require('./../server/db/mongoose');
const { Customer } = require('./../server/models/customer');
const { User } = require('./../server/models/user'); 

// 5b576dde8d108706588d5b9c
// let id = '5b5790f29a3aa7082cdca784';
let id = '5b5739546206100289e077b1';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid'); 
};

// Customer.find({
//     _id: id
// }).then((customers) => {
//     console.log('Customers', customers); 
// }); 

// Customer.findOne({
//     _id: id 
// }).then((customer) => {
//     console.log('Customer', customer); 
// });

// Customer.findById(id).then((customer) => {
//     if (!customer) {
//         console.log('Id not found'); 
//     }
//     console.log('Customer By Id', customer); 
// });



User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found!'); 
    }

    console.log('User Id: ', user); 
}).catch((e) => console.log(e)); 


