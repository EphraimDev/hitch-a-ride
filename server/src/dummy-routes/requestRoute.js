import express from 'express';
import RequestController from '../controller/joinRideController';

const router = express.Router();

router.post('/api/v1/requests', RequestController.create);
router.get('/api/v1/requests', RequestController.getAllRequests);
router.get('/api/v1/requests/:requestId', RequestController.getRequest);
router.put('/api/v1/requests/:requestId', RequestController.update);
router.delete('/api/v1/requests/:requestId', RequestController.delete);

export default router;
