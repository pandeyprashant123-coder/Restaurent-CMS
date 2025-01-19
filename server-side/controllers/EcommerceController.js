// controllers/EcommerceController.js
import {
  FlashSale,
  FlashSaleProduct,
  Coupon,
  ShippingRule,
  PaymentMethod,
} from "../models/Ecommerce.js";
import Product from "../models/Product.js";

// Flash Sale Controllers
export const createFlashSale = async (req, res) => {
  try {
    console.log("Creating flash sale with data:", req.body);
    const flashSale = new FlashSale(req.body);
    await flashSale.save();
    console.log("Flash sale created successfully:", flashSale);
    res.status(201).json({
      status: "success",
      message: "Flash sale created successfully",
      data: flashSale,
    });
  } catch (error) {
    console.error("Error creating flash sale:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getFlashSales = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const flashSales = await FlashSale.find(query).sort("-createdAt");
    res.status(200).json({
      status: "success",
      data: flashSales,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getActiveFlashSales = async (req, res) => {
  try {
    const currentDate = new Date();
    const activeFlashSales = await FlashSale.find({
      status: "active",
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    }).sort("-createdAt");

    res.status(200).json({
      status: "success",
      data: activeFlashSales,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Flash Sale Product Controllers
export const addProductToFlashSale = async (req, res) => {
  try {
    const { flashSaleId } = req.params;
    const { productId, discountPercentage, quantity } = req.body;

    // Validate flash sale
    const flashSale = await FlashSale.findById(flashSaleId);
    if (!flashSale) {
      return res.status(404).json({
        status: "error",
        message: "Flash sale not found",
      });
    }

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    // Check if product already exists in flash sale
    const existingProduct = await FlashSaleProduct.findOne({
      flashSale: flashSaleId,
      product: productId,
    });

    if (existingProduct) {
      return res.status(400).json({
        status: "error",
        message: "Product already exists in this flash sale",
      });
    }

    const flashSaleProduct = new FlashSaleProduct({
      flashSale: flashSaleId,
      product: productId,
      discountPercentage,
      quantity,
    });

    await flashSaleProduct.save();

    res.status(201).json({
      status: "success",
      message: "Product added to flash sale successfully",
      data: flashSaleProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getFlashSaleProducts = async (req, res) => {
  try {
    const { flashSaleId } = req.params;
    const flashSaleProducts = await FlashSaleProduct.find({
      flashSale: flashSaleId,
    })
      .populate("product")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      data: flashSaleProducts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Coupon Controllers
export const createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({
      status: "success",
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;
    const coupon = await Coupon.findOne({
      code,
      status: "active",
      expiryDate: { $gt: new Date() },
    });

    if (!coupon) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired coupon",
      });
    }

    if (amount < coupon.minimumPurchase) {
      return res.status(400).json({
        status: "error",
        message: `Minimum purchase amount is ${coupon.minimumPurchase}`,
      });
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        status: "error",
        message: "Coupon usage limit exceeded",
      });
    }

    const discountAmount =
      coupon.discountType === "percentage"
        ? (amount * coupon.discountAmount) / 100
        : coupon.discountAmount;

    const finalDiscount = coupon.maxDiscount
      ? Math.min(discountAmount, coupon.maxDiscount)
      : discountAmount;

    res.status(200).json({
      status: "success",
      data: {
        ...coupon.toObject(),
        discountAmount: finalDiscount,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Shipping Rule Controllers
export const createShippingRule = async (req, res) => {
  try {
    const shippingRule = new ShippingRule(req.body);
    await shippingRule.save();
    res.status(201).json({
      status: "success",
      message: "Shipping rule created successfully",
      data: shippingRule,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const calculateShipping = async (req, res) => {
  try {
    const { orderAmount, weight, location } = req.body;
    const shippingRules = await ShippingRule.find({ status: "active" });

    let applicableRules = shippingRules.filter((rule) => {
      if (
        rule.minOrderAmount <= orderAmount &&
        (!rule.maxOrderAmount || orderAmount <= rule.maxOrderAmount)
      ) {
        if (rule.type === "weight") {
          return !rule.weightLimit || weight <= rule.weightLimit;
        }
        if (rule.type === "location") {
          return rule.locations.some(
            (loc) =>
              loc.city === location.city &&
              loc.state === location.state &&
              loc.country === location.country
          );
        }
        return true;
      }
      return false;
    });

    if (applicableRules.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No shipping rules applicable for this order",
      });
    }

    // Get the most economical shipping rule
    const bestRule = applicableRules.reduce((prev, curr) => {
      const prevCost =
        prev.type === "location"
          ? prev.locations.find(
              (loc) =>
                loc.city === location.city &&
                loc.state === location.state &&
                loc.country === location.country
            ).cost
          : prev.cost;

      const currCost =
        curr.type === "location"
          ? curr.locations.find(
              (loc) =>
                loc.city === location.city &&
                loc.state === location.state &&
                loc.country === location.country
            ).cost
          : curr.cost;

      return prevCost < currCost ? prev : curr;
    });

    const shippingCost =
      bestRule.type === "location"
        ? bestRule.locations.find(
            (loc) =>
              loc.city === location.city &&
              loc.state === location.state &&
              loc.country === location.country
          ).cost
        : bestRule.cost;

    res.status(200).json({
      status: "success",
      data: {
        rule: bestRule,
        cost: shippingCost,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Payment Method Controllers
export const createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = new PaymentMethod({
      ...req.body,
      logo: req.file ? req.file.path : undefined,
    });
    await paymentMethod.save();
    res.status(201).json({
      status: "success",
      message: "Payment method created successfully",
      data: paymentMethod,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getActivePaymentMethods = async (req, res) => {
  try {
    const { amount } = req.query;
    let query = { status: "active" };

    if (amount) {
      query = {
        ...query,
        minAmount: { $lte: amount },
        $or: [{ maxAmount: null }, { maxAmount: { $gte: amount } }],
      };
    }

    const paymentMethods = await PaymentMethod.find(query)
      .select("-credentials")
      .sort("name");

    res.status(200).json({
      status: "success",
      data: paymentMethods,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};