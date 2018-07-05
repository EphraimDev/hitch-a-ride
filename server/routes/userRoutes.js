import express from 'express';
import user from '../controller/users';
//import ValidateInput from '../middleware/validators/rideoffers';

const router = express.Router();

router.post('/api/v1/auth/signup', user.signup);
router.post('/api/v1/auth/login', user.login);
router.post('/api/v1/auth/forgot_password', user.forgotPassword);
router.post('/api/v1/auth/reset_password', user.resetPassword);
//router.delete('/api/v1/auth/:userId', user.delete);

export default router;
