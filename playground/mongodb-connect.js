//const MongoClient = require('mongodb').MongoClient; 
const { MongoClient, ObjectID } = require('mongodb'); 


MongoClient.connect('mongodb://localhost/CustomerApp', (err, client) => {
    if (err) {
        return console.log('Error: ' + err); 
    }

    console.log('Connected to MongoDB server'); 
    const db = client.db('CustomerApp'); 

    // db.collection('Customers').insertOne({
    //     firstName: 'Thinh',
    //     lastName: 'Nguyen',
    //     age: 52,
    //     done: false 
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert customer', err); 
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2)); 
    // });

    // db.collection('Users').insertOne({
    //     name: 'Thinh Nguyen',
    //     age: 52,
    //     location: 'Sacramento'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Err', err); 
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2)); 
    // });
    client.close(); 
});





