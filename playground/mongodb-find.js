const { MongoClient, ObjectID } = require('mongodb'); 

MongoClient.connect('mongodb://localhost/CustomerApp', (err, client) => {
    if (err) {
        return console.log('Error: ', err); 
    }

    console.log('Connected to mongo server'); 

    const db = client.db('CustomerApp');

    // db.collection('Customers').find({ 
    //     _id: new ObjectID('5b5684dca8dd9d57580526e7')
    //     })
    //     .toArray()
    //     .then((docs) => {
    //         console.log('Customers');
    //         console.log(JSON.stringify(docs, undefined, 2));  
    //     }, (err) => {
    //         console.log('Unable to find customer', err); 
    //     });

    // db.collection('Customers').findOne({ done: true})
    //     .then((customer) => {
    //         console.log(customer); 
    //     }, (err) => {  
    //         console.log('Unable to find that customer', err); 
    //     }); 

    // db.collection('Customers').find().count()
    //     .then((count) => {
    //         console.log('Count is: ' + count); 
    //     }); 

    // db.collection('Users').find().toArray()
    //     .then((customers) => {
    //         customers.forEach((customer) => {
    //             if (customer.name === 'Huong Khuu') {
    //                 console.log(customer); 
    //             }
    //         }); 
    //     }, (err) => {
    //         console.log('Unable to find', err); 
    //     });

    db.collection('Users').find({ name: 'Huong Khuu'}).toArray()
        .then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2)); 
        });
});




