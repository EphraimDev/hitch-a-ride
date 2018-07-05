import express from 'express';
import rideOffers from '../controller/rideOffers';
//import Authorization from '../middlewares/check-auth';

const router = express.Router();

router.get('/api/v1/rides/:ridesId', rideOffers.getARideOffer);
router.get('/api/v1/rides', rideOffers.getAllOffers);
//router.post('/api/v1/meals/add-meal', mealValidation.create, validation, mealController.create);
//router.put('/api/v1/meals/:mealId/edit', mealValidation.update, validation, mealController.update);
//router.delete('/api/v1/meals/:mealId/delete', mealValidation.delete, ValidationHandler.validate, mealController.delete);

export default router;

 