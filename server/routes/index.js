import express from 'express';
import offerRoutes from './rideOffers';
//import joinRoutes from './joinRoute';
import userRoutes from './userRoutes';

const router = express.Router();

router.use(offerRoutes);
//router.use(joinRoutes);
router.use(userRoutes);

export default router;