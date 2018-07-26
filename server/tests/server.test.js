const expect = require('expect');
const request = require('supertest'); 
const { ObjectID } = require('mongodb'); 

const {app} = require('./../server'); 
const {Customer} = require('./../models/customer'); 

const customers = [{
    _id: new ObjectID(),
    firstName: 'Tim'
}, {
    _id: new ObjectID(), 
    firstName: 'Kha'
}];

beforeEach((done) => {
    Customer.remove({}).then(() => {
        return Customer.insertMany(customers); 
    }).then(() => done());
}); 

describe('POST /customers', () => {
    it('should create a new customer', (done) => {
        let firstName = 'Huong'; 

        request(app)
            .post('/customers')
            .send({firstName})
            .expect(200)
            .expect((res) => {
                expect(res.body.firstName).toBe(firstName); 
            })
            .end((err, res) => {
                if (err) {
                    return done(err); 
                }

                Customer.find({firstName}).then((customers) => {
                    expect(customers.length).toBe(1); 
                    expect(customers[0].firstName).toBe(firstName); 
                    done(); 
                }).catch((err) => done(err)); 
            });
    });

    it('should not create customer with invalid body data', (done) => {
        request(app) 
            .post('/customers')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err); 
                }

                Customer.find().then((customers) => {
                    expect(customers.length).toBe(2); 
                    done(); 
                }).catch((err) => done(err)); 
            });

    });
});

describe('GET /customers', () => {
    it('should get all customers', (done) => {
        request(app)
            .get('/customers')
            .expect(200)
            .expect((res) => {
                expect(res.body.customers.length).toBe(2); 
            })
            .end(done); 
    });
});

describe('GET /customers/:id', () => {
    it('should return customer doc', (done) => {
        request(app)
            .get(`/customers/${customers[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.customer.firstName).toBe(customers[0].firstName);
            })
            .end(done); 
    });

    it('should return 404 if customer not found', (done) => {
        let id = new ObjectID(); 
        
        request(app)
            .get(`/customers/${id.toHexString()}`)
            .expect(404)
            .end(done);         
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/customer/123')
            .expect(404)
            .end(done);
    });
});


describe('DELETE /customers/:id', () => {
    it('should remove a customer', (done) => {
        let hexId = customers[1]._id.toHexString(); 

        request(app)
            .delete(`/customers/${hexId}`)
            .expect(200)
            .expect((res) => {
                console.log(res.body); 
                expect(res.body.customer._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err); 
                }

                Customer.findById(hexId).then((customer) => {
                    expect(customer).toBeFalsy();
                    done();
                }).catch((err) => done(err)); 
            });
    });
});