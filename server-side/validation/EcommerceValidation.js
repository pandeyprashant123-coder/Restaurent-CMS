// validation/EcommerceValidation.js
import { body } from "express-validator";

export const flashSaleValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("startDate").isISO8601().withMessage("Valid start date is required"),
  body("endDate").isISO8601().withMessage("Valid end date is required"),
  body("description").optional().isString(),
  body("status").optional().isIn(["active", "inactive"]),
];

export const flashSaleProductValidation = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
  body("discountPercentage")
    .notEmpty()
    .withMessage("Discount percentage is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount percentage must be between 0 and 100"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  body("status").optional().isIn(["active", "inactive"]),
];

export const couponValidation = [
  body("code")
    .notEmpty()
    .withMessage("Coupon code is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Coupon code must be between 3 and 20 characters"),
  body("discountType").isIn(["percentage", "fixed"]),
  body("discountAmount")
    .isFloat({ gt: 0 })
    .withMessage("Discount amount must be greater than 0"),
  body("minimumPurchase")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum purchase must be at least 0"),
  body("maxDiscount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum discount must be at least 0"),
  body("usageLimit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Usage limit must be at least 1"),
  body("expiryDate")
    .isISO8601()
    .withMessage("Valid expiry date is required")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Expiry date must be in the future");
      }
      return true;
    }),
  body("status").optional().isIn(["active", "inactive"]),
];

export const shippingRuleValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("cost")
    .isFloat({ gt: 0 })
    .withMessage("Cost must be greater than 0"),
  body("type")
    .isIn(["flat", "weight", "location"])
    .withMessage("Invalid shipping rule type"),
  body("minOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum order amount must be at least 0"),
  body("maxOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum order amount must be at least 0")
    .custom((value, { req }) => {
      if (value && req.body.minOrderAmount && value <= req.body.minOrderAmount) {
        throw new Error("Maximum order amount must be greater than minimum");
      }
      return true;
    }),
  body("weightLimit")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight limit must be at least 0"),
  body("locations")
    .optional()
    .isArray()
    .withMessage("Locations must be an array")
    .custom((value, { req }) => {
      if (req.body.type === "location" && (!value || value.length === 0)) {
        throw new Error("Locations are required for location-based shipping");
      }
      return true;
    }),
  body("locations.*.city").optional().isString(),
  body("locations.*.state").optional().isString(),
  body("locations.*.country").optional().isString(),
  body("locations.*.cost")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Location cost must be greater than 0"),
  body("status").optional().isIn(["active", "inactive"]),
];

export const paymentMethodValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("code")
    .notEmpty()
    .withMessage("Code is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("Code must be between 2 and 20 characters"),
  body("description").optional().isString(),
  body("instructions").optional().isString(),
  body("processingFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Processing fee must be at least 0"),
  body("minAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum amount must be at least 0"),
  body("maxAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum amount must be at least 0")
    .custom((value, { req }) => {
      if (value && req.body.minAmount && value <= req.body.minAmount) {
        throw new Error("Maximum amount must be greater than minimum");
      }
      return true;
    }),
  body("credentials").optional().isObject(),
  body("status").optional().isIn(["active", "inactive"]),
];