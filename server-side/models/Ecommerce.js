// models/Ecommerce.js
import mongoose from "mongoose";

const flashSaleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const flashSaleProductSchema = new mongoose.Schema({
  flashSale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlashSale",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  soldCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  minimumPurchase: {
    type: Number,
    default: 0,
  },
  maxDiscount: {
    type: Number,
    default: null,
  },
  usageLimit: {
    type: Number,
    default: null,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const shippingRuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["flat", "weight", "location"],
    required: true,
  },
  minOrderAmount: {
    type: Number,
    default: 0,
  },
  maxOrderAmount: {
    type: Number,
    default: null,
  },
  weightLimit: {
    type: Number,
    default: null,
  },
  locations: [{
    city: String,
    state: String,
    country: String,
    cost: Number,
  }],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const paymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  instructions: {
    type: String,
    default: "",
  },
  processingFee: {
    type: Number,
    default: 0,
  },
  minAmount: {
    type: Number,
    default: 0,
  },
  maxAmount: {
    type: Number,
    default: null,
  },
  credentials: {
    type: Map,
    of: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
flashSaleSchema.index({ startDate: 1, endDate: 1, status: 1 });
flashSaleProductSchema.index({ flashSale: 1, product: 1 }, { unique: true });
couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ expiryDate: 1, status: 1 });
shippingRuleSchema.index({ type: 1, status: 1 });
paymentMethodSchema.index({ code: 1 }, { unique: true });

export const FlashSale = mongoose.model("FlashSale", flashSaleSchema);
export const FlashSaleProduct = mongoose.model("FlashSaleProduct", flashSaleProductSchema);
export const Coupon = mongoose.model("Coupon", couponSchema);
export const ShippingRule = mongoose.model("ShippingRule", shippingRuleSchema);
export const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);