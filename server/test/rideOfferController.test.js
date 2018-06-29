import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import GUID from '../middleware/guid';

chai.should()
chai.use(chaiAsPromised)

import app from '../app';

chai.use(chaiHttp);

describe('Tests for ride offers API endpoints', () => {    
    describe('Handles valid endpoints for ride offers', () => {
        describe('POST api/v1/rides', () => {
            it('should add a ride offer option', (done) => {
                let newRideOffer = {
                    id: GUID,
                    driver: "Jesse Kalu",
                    vehicleBrand: 'Toyota',
                    vehicleModel: 'Camry',
                    vehiclePlateNo: 'KTU5768IGH',
                    vehicleColor: 'black',
                    vehicleYear: 2007,
                    availableSeats: 3,
                    currentLocation: 'Ikeja',
                    finalDestination: 'Eko-Hotels',
                    timeOfDeparture: '7:30am',
                    price: 1500,
                    date: "24th, June 2018",
                    img: "htej",
                    route: 'Ikeja - 3MB - VI - Eko-Hotels'
                }
                chai.request(app).
                post('/api/v1/rides').
                send(newRideOffer).
                end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.newRideOffer).to.include.keys('id');
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Ride offer created successfully');
                    res.body.should.have.property('newRideOffer').eql(newRideOffer);
                    res.body.should.have.property('success').eql(true);
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('PUT api/v1/rides/:rideId', () => {
            it('should make changes to a ride offer option', (done) => {
                let updatedRide = {
                    id: '2e00bcef-d3af-9d13-6b85-e9b30a043e28',
                    driver: "Jesse Kalu",
                    vehicleBrand: 'Toyota',
                    vehicleModel: 'Camry',
                    vehiclePlateNo: 'KTU5768IGH',
                    vehicleColor: 'black',
                    vehicleYear: 2007,
                    availableSeats: 3,
                    currentLocation: 'Ikeja',
                    finalDestination: 'Eko-Hotels',
                    timeOfDeparture: '7:30am',
                    price: 1500,
                    date: "24th, June 2018",
                    img: "htej",
                    route: 'Ikeja - 3MB - VI - Eko-Hotels'
                }
                chai.request(app).
                put('/api/v1/rides/2e00bcef-d3af-9d13-6b85-e9b30a043e28').
                send(updatedRide).
                end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body.updatedRide).to.include.keys('id');
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Updated successfully');
                    res.body.should.have.property('updatedRide').eql(updatedRide);
                    res.body.should.have.property('success').eql(true);
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('GET api/v1/rides/:rideId', () => {
            it('should return ride offer details of ride Id', (done) => {
                chai.request(app).
                get('/api/v1/rides/2e00bcef-d3af-9d13-6b85-e9b30a043e28').
                end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.rideFound).to.include.keys('id');
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Ride id 2e00bcef-d3af-9d13-6b85-e9b30a043e28 was found');
                    res.body.should.have.property('rideFound');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('GET api/v1/rides', () => {
            it('should get all ride offers', (done) => {
                chai.request(app).
                get('/api/v1/rides').
                end((err, res) => {
                    expect(res.body).to.include.keys('rides');
                    expect(res.statusCode).to.equal(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Rides where retrieved successfully');
                    res.body.should.have.property('rides');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('DELETE api/v1/rides/:rideId', () => {
            it('should delete selected ride offer option', (done) => {
                chai.request(app).
                delete('/api/v1/rides/2e00bcef-d3af-9d13-6b85-e9b30a043e28').
                end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Ride id 2e00bcef-d3af-9d13-6b85-e9b30a043e28 was deleted successfully');
                    res.body.should.have.property('success').eql(true);
                    if (err) return done(err);
                    done();
                });
            });
        });
    });
    
    describe('Handles invalid endpoints for ride offers', () => {
        describe('POST api/v1/rides', () => {
            it('should return an error message to cross check data', (done) => {
                let newRideOffer = {
                    id: GUID,
                    driver: '',
                    vehicleBrand: 'Toyota',
                    vehicleModel: 'Camry',
                    vehiclePlateNo: 'KTU5768IGH',
                    vehicleColor: 'black',
                    vehicleYear: 2007,
                    availableSeats: 3,
                    currentLocation: 'Ikeja',
                    finalDestination: 'Eko-Hotels',
                    timeOfDeparture: '7:30am',
                    price: 1500,
                    date: "24th, June 2018",
                    img: "htej",
                    route: 'Ikeja - 3MB - VI - Eko-Hotels'
                }
                chai.request(app).
                post('/api/v1/rides').
                send(newRideOffer).
                end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Cross-check driver name input');
                    if (err) return done(err);
                    done();
                });
            });

            it('should return an error message for an offer already created with that vehicle', (done) => {
                let newRideOffer = {
                    id: GUID,
                    driver: 'Me',
                    vehicleBrand: 'Toyota',
                    vehicleModel: 'Camry',
                    vehiclePlateNo: 'KTU5768IKJ',
                    vehicleColor: 'black',
                    vehicleYear: 2007,
                    availableSeats: 3,
                    currentLocation: 'Ikeja',
                    finalDestination: 'Eko-Hotels',
                    timeOfDeparture: '7:30am',
                    price: 1500,
                    date: "24th, June 2018",
                    img: "htej",
                    route: 'Ikeja - 3MB - VI - Eko-Hotels'
                }
                chai.request(app).
                post('/api/v1/rides').
                send(newRideOffer).
                end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Ride with plate number KTU5768IKJ already exists');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('PUT api/v1/rides/:rideId', () => {
            it('should return an error message to cross check data', (done) => {
                let newRideOffer = {
                    driver: '',
                    vehicleBrand: 'Toyota',
                    vehicleModel: 'Camry',
                    vehiclePlateNo: 'KTU5768IGH',
                    vehicleColor: 'black',
                    vehicleYear: 2007,
                    availableSeats: 3,
                    currentLocation: 'Ikeja',
                    finalDestination: 'Eko-Hotels',
                    timeOfDeparture: '7:30am',
                    price: 1500,
                    date: "24th, June 2018",
                    img: "htej",
                    route: 'Ikeja - 3MB - VI - Eko-Hotels'
                }
                chai.request(app).
                put('/api/v1/rides/703d6d3f-21dc-511f-51cf-7a02156296d6').
                send(newRideOffer).
                end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Cross-check driver name input');
                    if (err) return done(err);
                    done();
                });
            });

            it('should return an error message for an offer that does not exist', (done) => {
                let newRideOffer = {
                    driver: 'Me',
                    vehicleBrand: 'Toyota',
                    vehicleModel: 'Camry',
                    vehiclePlateNo: 'KTU5768IKJ',
                    vehicleColor: 'black',
                    vehicleYear: 2007,
                    availableSeats: 3,
                    currentLocation: 'Ikeja',
                    finalDestination: 'Eko-Hotels',
                    timeOfDeparture: '7:30am',
                    price: 1500,
                    date: "24th, June 2018",
                    img: "htej",
                    route: 'Ikeja - 3MB - VI - Eko-Hotels'
                }
                chai.request(app).
                put('/api/v1/rides/2r00bcef-d3af-9d13-6b85-e9b30a043e28').
                send(newRideOffer).
                end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Ride offer does not exist');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('GET api/v1/rides/:rideId', () => {
            it('should return an error message for ride offer that does not exist', (done) => {
                chai.request(app).
                get('/api/v1/rides/2e00ucef-d3af-9d13-6b85-e9b30a043e28').
                end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Ride id 2e00ucef-d3af-9d13-6b85-e9b30a043e28 does not exist');
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('DELETE api/v1/rides/:rideId', () => {
            it('should return error if selected ride id does not exist', (done) => {
                chai.request(app).
                delete('/api/v1/rides/2e00ucef-d3af-9d13-6b85-e9b30a043e28').
                end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Ride not found');
                    res.body.should.have.property('success').eql(false);
                    if (err) return done(err);
                    done();
                });
            });
        });
    });   
});

