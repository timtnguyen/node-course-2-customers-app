const mongoose = require('mongoose'); 

let Customer = mongoose.model('Customer', {
    firstName: {
        type: String, 
        required: true,
        minLength: 1,
        trim: true 
    },
    lastName: {
        type: String,
        lastName: 'Tran',
        //required: true, 
        minLength: true,
        trim: true   
    },
    completed: {
        type: Boolean, 
        default: false 
    },
    completedAt: {
        type: Number, 
        minLength: true,
        default: null  
    }
});

// let newCustomer = new Customer({
//     firstName: 'John',
//     completed: true,
//     completedAt: 123 
// });

// newCustomer.save().then((docs) => {
//     console.log(JSON.stringify(docs, undefined, 2)); 
// }, (err) => {
//     console.log('Unable to save', err); 
// });

module.exports = {Customer}; 
