import express from 'express';
import DriverController from '../controller/offerRideController';
//import ValidateInput from '../middleware/validators/rideoffers';

const router = express.Router();

router.post('/api/v1/rides', DriverController.create);
router.get('/api/v1/rides', DriverController.getAllRideOffers);
router.get('/api/v1/rides/:rideId', DriverController.getRide);
router.put('/api/v1/rides/:rideId', DriverController.update);
router.delete('/api/v1/rides/:rideId', DriverController.deleteRide);

export default router;
