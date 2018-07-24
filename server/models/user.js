const mongoose = require('mongoose'); 

// Create Users collection

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true 
    }
});

// let newUser = new User({
//     email: 'tran@tran.com'
// });

// newUser.save().then((docs) => {
//     console.log(JSON.stringify(docs, undefined, 2)); 
// }, (err) => {
//     console.log('Unable to save user', err); 
// });

module.exports = {User}; 
