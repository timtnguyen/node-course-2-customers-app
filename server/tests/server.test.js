const expect = require('expect');
const request = require('supertest'); 

const {app} = require('./../server'); 
const {Customer} = require('./../models/customer'); 

beforeEach((done) => {
    Customer.remove({}).then(() => done());
}); 

describe('POST /customers', () => {
    it('should create a new todo', (done) => {
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

                Customer.find().then((customers) => {
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
                    expect(customers.length).toBe(0); 
                    done(); 
                }).catch((err) => done(err)); 
            });

    });
});