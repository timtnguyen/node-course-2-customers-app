const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/CustomerApp');

module.exports = {
    mongoose 
}
