const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost/CustomerApp', (err, client) => {
    if (err) {
        console.log('Error: ', err); 
    }

    console.log('Connected to MongoDB server'); 
    const db = client.db('CustomerApp'); 

    // deleteMany
    // db.collection('Customers').deleteMany({ done: false})
    //     .then((result) => {
    //         console.log(result); 
    //     }); 
    // deleteOne 
    // db.collection('Customers').deleteOne({ firstName: "John" })
    //     .then((result) => {
    //         console.log(result); 
    //     }, (err) => {
    //         console.log('Error: ', err); 
    //     }); 

    // findOneAndDelete 
    // db.collection('Users').deleteMany({ name: 'Huong Khuu' })
    //     .then((result) => {
    //         console.log(result); 
    //     });
    db.collection('Users').findOneAndDelete({ name: 'John Tran' })
        .then((result) => {
            console.log(result); 
        });
});