import { Router } from 'express';
import DriverController from '../controller/offerRideController';
import rideOfferValidation from '../middleware/validators/rideoffers';

const router = Router();

router.post('/api/v1/rides', rideOfferValidation.create, DriverController.create);
router.get('/api/v1/rides', DriverController.getAllRideOffers);
router.get('/api/v1/rides/:rideId', DriverController.getRide);
router.put('/api/v1/rides/:rideId', rideOfferValidation.update, DriverController.update);
router.delete('/api/v1/rides/:rideId', DriverController.deleteRide);

export default router;
