import express from 'express';
import driverRoutes from './driverRoutes';
//import mealRoutes from './meals';
//import menuRoutes from './menu';

const router = express.Router();

router.use(driverRoutes);
//router.use(menuRoutes);
//router.use(mealRoutes);

export default router;