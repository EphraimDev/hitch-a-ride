import express from 'express';
import driverRoutes from './driverRoutes';
import requestRoutes from './requestRoute';
//import mealRoutes from './meals';
//import menuRoutes from './menu';

const router = express.Router();

router.use(driverRoutes);
router.use(requestRoutes);
//router.use(mealRoutes);

export default router;