const { MongoClient, ObjectID } = require('mongodb'); 

MongoClient.connect('mongodb://localhost/CustomerApp', (err, client) => {
    if (err) {
        return console.log('Error', err); 
    }

    console.log('Connected to MongoDB server'); 
    const db = client.db('CustomerApp'); 

    // db.collection('Customers').findOneAndUpdate({
    //     _id: new ObjectID('5b56b747a8dd9d5758053804')
    // }, {
    //     $set: {
    //         firstName: 'Tim'
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // }); 

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b5680d48afab4028fa789d1')
    }, {
        $set: {
            name: 'Huong Khuu'
        }, 
        $inc: {
            age: 5 
        }
    }, {
        returnOriginal: false 
    }).then((result) => {
        console.log(result); 
    });
});