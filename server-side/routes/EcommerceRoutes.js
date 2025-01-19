// routes/EcommerceRoutes.js
import { Router } from "express";
import {
  createFlashSale,
  getFlashSales,
  getActiveFlashSales,
  addProductToFlashSale,
  getFlashSaleProducts,
  createCoupon,
  validateCoupon,
  createShippingRule,
  calculateShipping,
  createPaymentMethod,
  getActivePaymentMethods,
} from "../controllers/EcommerceController.js";
import {
  flashSaleValidation,
  flashSaleProductValidation,
  couponValidation,
  shippingRuleValidation,
  paymentMethodValidation,
} from "../validation/EcommerceValidation.js";
import validateRequest from "../middlewares/ValidateRequest.js";
import { isAdmin } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

// Flash Sale routes
router.post(
  "/flash-sale",
  isAdmin,
  flashSaleValidation,
  validateRequest,
  createFlashSale
);
router.get("/flash-sales", getFlashSales);
router.get("/flash-sales/active", getActiveFlashSales);

// Flash Sale Product routes
router.post(
  "/flash-sale/:flashSaleId/products",
  isAdmin,
  flashSaleProductValidation,
  validateRequest,
  addProductToFlashSale
);
router.get("/flash-sale/:flashSaleId/products", getFlashSaleProducts);

// Coupon routes
router.post(
  "/coupon",
  isAdmin,
  couponValidation,
  validateRequest,
  createCoupon
);
router.post("/coupon/validate", validateCoupon);

// Shipping Rule routes
router.post(
  "/shipping-rule",
  isAdmin,
  shippingRuleValidation,
  validateRequest,
  createShippingRule
);
router.post("/shipping/calculate", calculateShipping);

// Payment Method routes
router.post(
  "/payment-method",
  isAdmin,
  upload.single("logo"),
  paymentMethodValidation,
  validateRequest,
  createPaymentMethod
);
router.get("/payment-methods", getActivePaymentMethods);

export default router;