import { Router } from 'express';
import { 
  initiatePayment, 
  verifyEsewaPayment, 
  processCardPayment,
  getPaymentStatus 
} from '../controllers/PaymentController.js';
import { paymentValidation, cardPaymentValidation } from '../validation/PaymentValidation.js';
import validateRequest from '../middlewares/ValidateRequest.js';
import rateLimit from 'express-rate-limit';
import { isUser } from '../middlewares/AuthMiddleware.js';

const router = Router();

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many payment attempts from this IP'
});

router.post('/initiate', isUser, paymentValidation, validateRequest, paymentLimiter, initiatePayment);
router.get('/esewa/verify', verifyEsewaPayment);
router.post('/card/process', isUser, cardPaymentValidation, validateRequest, paymentLimiter, processCardPayment);
router.get('/status/:paymentId', isUser, getPaymentStatus);

export default router;