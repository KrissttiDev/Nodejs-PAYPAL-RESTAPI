import {Router} from 'express';
import {createOrder,captureOrder,cancelPayment} from '../controllers/payment.controller.js';

const router = Router();

router.post('/created-order',createOrder);
router.get('/captured-order',captureOrder);
router.get('/cancel-order',cancelPayment);

export default router;