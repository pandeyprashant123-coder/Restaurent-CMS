import Payment from '../models/Payment.js';
import axios from 'axios';
import crypto from 'crypto';
import { Order } from '../models/order.js';
import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export class PaymentService {
  // COD Payment
  static async createCODPayment(orderId, userId, amount) {
    try {
      await Order.findByIdAndUpdate(orderId, { status: 'Processing' });

      const payment = new Payment({
        orderId,
        userId,
        amount,
        paymentMethod: 'COD',
        status: 'PENDING',
        paymentDetails: {
          initiatedAt: new Date(),
          deliveryNote: 'Cash to be collected on delivery'
        }
      });

      await payment.save();
      return { success: true, paymentId: payment._id };
    } catch (error) {
      throw new Error(`COD payment creation failed: ${error.message}`);
    }
  }

  // eSewa Payment
  static async initiateEsewaPayment(orderId, userId, amount) {
    try {
      const transactionId = crypto.randomBytes(16).toString('hex');
      
      const payment = new Payment({
        orderId,
        userId,
        amount,
        paymentMethod: 'ESEWA',
        status: 'PENDING',
        transactionId,
        paymentDetails: {
          initiatedAt: new Date()
        }
      });

      await payment.save();

      // eSewa payment parameters
      const esewaParams = {
        amt: amount,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: amount,
        pid: transactionId,
        scd: process.env.ESEWA_MERCHANT_CODE,
        su: `/payment/verify/success`,
        fu: `/payment/verify/failure`
      };

      return {
        success: true,
        paymentId: payment._id,
        transactionId,
        esewaParams,
        redirectUrl: process.env.ESEWA_PAYMENT_URL
      };
    } catch (error) {
      throw new Error(`eSewa payment initiation failed: ${error.message}`);
    }
  }

  // Card Payment
  static async processCardPayment(orderId, userId, cardDetails) {
    try {
      const currentDate = new Date();
      const expiry = new Date(cardDetails.expiryYear, cardDetails.expiryMonth - 1);
      
      if (expiry < currentDate) {
        throw new Error('Card has expired');
      }

      const payment = new Payment({
        orderId,
        userId,
        amount: cardDetails.amount,
        paymentMethod: 'CARD',
        status: 'PENDING',
        paymentDetails: {
          initiatedAt: new Date(),
          last4: cardDetails.cardNumber.slice(-4),
          cardType: this.getCardType(cardDetails.cardNumber)
        }
      });

      await payment.save();

      try {
        // Create payment with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(cardDetails.amount * 100),
          currency: 'usd',
          payment_method_data: {
            type: 'card',
            card: {
              number: cardDetails.cardNumber,
              exp_month: cardDetails.expiryMonth,
              exp_year: cardDetails.expiryYear,
              cvc: cardDetails.cvv,
            },
          },
          confirm: true,
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never'
          }
        });

        if (paymentIntent.status === 'succeeded') {
          payment.status = 'COMPLETED';
          payment.paymentDetails.transactionId = paymentIntent.id;
          payment.paymentDetails.completedAt = new Date();
          await payment.save();

          await Order.findByIdAndUpdate(orderId, { status: 'Processing' });

          return { 
            success: true, 
            paymentId: payment._id,
            transactionId: paymentIntent.id 
          };
        } else {
          throw new Error('Payment failed');
        }
      } catch (stripeError) {
        payment.status = 'FAILED';
        payment.paymentDetails.error = stripeError.message;
        payment.paymentDetails.failedAt = new Date();
        await payment.save();

        if (stripeError.type === 'StripeCardError') {
          throw new Error(`Card error: ${stripeError.message}`);
        } else {
          throw new Error('Payment processing failed');
        }
      }
    } catch (error) {
      throw new Error(`Card payment failed: ${error.message}`);
    }
  }

  // Helper method to get card type
  static getCardType(cardNumber) {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cardNumber)) {
        return type;
      }
    }
    return 'unknown';
  }

  // Verify payment status
  static async verifyPayment(paymentId, type) {
    try {
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        throw new Error('Payment not found');
      }

      switch (type) {
        case 'esewa':
          return this.verifyEsewaTransaction(payment.orderId, payment.amount, payment.transactionId);
        case 'stripe':
          return this.checkStripePaymentStatus(payment.paymentDetails.transactionId);
        default:
          throw new Error('Invalid payment type');
      }
    } catch (error) {
      throw new Error(`Payment verification failed: ${error.message}`);
    }
  }

  // Verify eSewa Payment
  static async verifyEsewaTransaction(orderId, amount, refId) {
    try {
      const verificationParams = {
        amt: amount,
        rid: refId,
        pid: orderId,
        scd: process.env.ESEWA_MERCHANT_CODE
      };

      const response = await axios.post(process.env.ESEWA_VERIFICATION_URL, verificationParams);

      if (response.data.includes('Success')) {
        await Payment.findOneAndUpdate(
          { orderId },
          { 
            status: 'COMPLETED',
            'paymentDetails.verifiedAt': new Date(),
            'paymentDetails.referenceId': refId
          }
        );

        await Order.findByIdAndUpdate(orderId, { status: 'Processing' });
        return { success: true, message: 'Payment verified successfully' };
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      await Payment.findOneAndUpdate(
        { orderId },
        { 
          status: 'FAILED',
          'paymentDetails.failedAt': new Date(),
          'paymentDetails.error': error.message
        }
      );
      throw new Error(`eSewa verification failed: ${error.message}`);
    }
  }

  // Check Stripe payment status
  static async checkStripePaymentStatus(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return { success: paymentIntent.status === 'succeeded' };
    } catch (error) {
      throw new Error(`Failed to check payment status: ${error.message}`);
    }
  }
}
