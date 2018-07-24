const expect = require('expect');
const request = require('supertest'); 

const {app} = require('./../server'); 
const {Customer} = require('./../models/customer'); 

beforeEach((done) => {
    Customer.remove({}).then(() => {
        done(); 
    });
}); 

describe('POST / customers', () => {
    it('should create a new todo', (done) => {
        let customer = {
            firstName: 'Huong', 
            lastName: 'Khuu', 
            completed: false,
            completedAt: 123
        };

        request(app)
            .post('/customers')
            .send({customer})
            .expect(200)
            .expect((res) => {
                console.log(res.body); 
            })
            .end((err, res) => {
                if (err) {
                    return done(err); 
                }
            });
    });
});