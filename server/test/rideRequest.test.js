import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import GUID from '../middleware/guid';

chai.should()
chai.use(chaiAsPromised)

import app from '../app';

chai.use(chaiHttp);

describe('Tests for ride request API endpoints', () => {    
    describe('Handles valid endpoints for ride requests', () => {
        describe('POST api/v1/requests', () => {
            it('should add a request option', (done) => {
                let newRequest = {
                    id: GUID,
                    name: "Jesse Kalu",
                    phoneNo: '08033889192',
                    email: "jesse@kalu.com",
                    address: "lekki",
                    noOfSeats: 2,
                    pickUp: 'Ikeja',
                    destination: 'Eko-Hotels',
                    time: '07:30am',
                    date: '30/12/2019'
                }
                chai.request(app).
                post('/api/v1/requests').
                send(newRequest).
                end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body.newRideRequest).to.include.keys('id');
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Ride request created successfully');
                    res.body.should.have.property('newRideRequest').eql(newRequest);
                    res.body.should.have.property('success').eql(true);
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('PUT api/v1/requests/:requestId', () => {
            it('should make changes to a ride request option', (done) => {
                let updatedRequest = {
                    id: '703f4d3f-21dc-511f-51cf-7a02156296d6',
                    name: "Jesse Kalu",
                    phoneNo: '08033889192',
                    email: "jesse@kalu.com",
                    address: "lekki",
                    noOfSeats: 2,
                    pickUp: 'Ikeja',
                    destination: 'Eko-Hotels',
                    time: '07:30am',
                    date: '30/12/2019'
                }
                chai.request(app).
                put('/api/v1/requests/703f4d3f-21dc-511f-51cf-7a02156296d6').
                send(updatedRequest).
                end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body.updatedRequest).to.include.keys('id');
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Ride request has been updated successfully');
                    res.body.should.have.property('updatedRequest').eql(updatedRequest);
                    res.body.should.have.property('success').eql(true);
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('GET api/v1/request/:requestId', () => {
            it('should return ride request details of request Id', (done) => {
                chai.request(app).
                get('/api/v1/requests/c96d3e0f-cd3f-aad5-8cc5-bc4d56823475').
                end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.requestFound).to.include.keys('id');
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Request id c96d3e0f-cd3f-aad5-8cc5-bc4d56823475 was found');
                    res.body.should.have.property('requestFound');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('GET api/v1/request', () => {
            it('should get all ride requests', (done) => {
                chai.request(app).
                get('/api/v1/requests').
                end((err, res) => {
                    expect(res.body).to.include.keys('requests');
                    expect(res.statusCode).to.equal(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Ride requests were retrieved successfully');
                    res.body.should.have.property('requests');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('DELETE api/v1/requests/:requestId', () => {
            it('should delete selected ride request option', (done) => {
                chai.request(app).
                delete('/api/v1/requests/2e00bcef-dtaf-9d13-6b85-e9b30a043e28').
                end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Request id 2e00bcef-dtaf-9d13-6b85-e9b30a043e28 was deleted successfully');
                    res.body.should.have.property('success').eql(true);
                    if (err) return done(err);
                    done();
                });
            });
        });
    });
    
    describe('Handles invalid endpoints for ride requests', () => {
        describe('POST api/v1/requests', () => {
            it('should return an error message to cross check data', (done) => {
                let newRequest = {
                    id: GUID,
                    name: "Jesse Kalu",
                    phoneNo: '08033889192',
                    email: "jesse",
                    address: "lekki",
                    noOfSeats: 2,
                    pickUp: 'Ikeja',
                    destination: 'Eko-Hotels',
                    time: '07:30am',
                    date: '30/12/2019'
                }
                chai.request(app).
                post('/api/v1/requests').
                send(newRequest).
                end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Check the email');
                    if (err) return done(err);
                    done();
                });
            });

            it('should return an error message for an already created request', (done) => {
                let newRequest = {
                    id: GUID,
                    name: "Jess Kalu",
                    phoneNo: '08033889192',
                    email: "jesse@kalu.com",
                    address: "lekki",
                    noOfSeats: 2,
                    pickUp: 'Ikeja',
                    destination: 'Eko-Hotels',
                    time: '17:30pm',
                    date: '30/07/2019'
                }
                chai.request(app).
                post('/api/v1/requests').
                send(newRequest).
                end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Request for this date and time has been made already');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('PUT api/v1/requests/:requestId', () => {
            it('should return an error message to cross check data', (done) => {
                let newRequest = {
                    name: "Jesse Kalu",
                    phoneNo: '08033889192',
                    email: "jesse@kalu.com",
                    address: "lekki",
                    noOfSeats: 2,
                    pickUp: 'Ikeja',
                    destination: 'Eko-Hotels',
                    time: '07:30am',
                    date: '30/122019'
                }
                chai.request(app).
                put('/api/v1/requests/2e00bcef-dtaf-9d24-6b85-e9b30a043e28').
                send(newRequest).
                end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Check the date; Acceptable date format is dd/mm/yyyy');
                    if (err) return done(err);
                    done();
                });
            });

            it('should return an error message for a request that does not exist', (done) => {
                let newRequest = {
                    name: "Jesse Kalu",
                    phoneNo: '08033889192',
                    email: "jesse@kalu.com",
                    address: "lekki",
                    noOfSeats: 2,
                    pickUp: 'Ikeja',
                    destination: 'Eko-Hotels',
                    time: '07:30am',
                    date: '30/12/2019'
                }
                chai.request(app).
                put('/api/v1/requests/2r00bcef-d3af-9d13-6b85-e9b30a043e28').
                send(newRequest).
                end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Ride request does not exist');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('GET api/v1/requests/:requestId', () => {
            it('should return an error message for ride request that does not exist', (done) => {
                chai.request(app).
                get('/api/v1/requests/2e00ucef-d3af-9d13-6b85-e9b30a043e28').
                end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Request id 2e00ucef-d3af-9d13-6b85-e9b30a043e28 does not exist');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('DELETE api/v1/requests/:requestId', () => {
            it('should return error if selected request id does not exist', (done) => {
                chai.request(app).
                delete('/api/v1/requests/2e00ucef-d3af-9d13-6b85-e9b30a043e28').
                end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Request not found');
                    res.body.should.have.property('success').eql(false);
                    if (err) return done(err);
                    done();
                });
            });
        });
    });   
});

