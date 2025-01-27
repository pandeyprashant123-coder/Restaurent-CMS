import express from "express";
import { Order } from "../models/order.js";
import { OrderItem } from "../models/order-item.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";

const { isUser, authenticate, isAdmin, isRestroAdmin } = AuthMiddleware;

const router = express.Router();

// Create an order (Requires user authentication)
router.post("/orders", authenticate, async (req, res) => {
  try {
    const {
      cartId,
      shippingAddress,
      paymentMethod,
      delivaryOption,
      totalPrice,
    } = req.body;

    // Validate cart
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart",
      });
    }

    // Validate input
    if (!cart.items?.length || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        required: ["cartId", "paymentMethod"],
      });
    }

    if (!["COD", "Esewa", "Card"].includes(paymentMethod)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment method" });
    }

    // Retrieve user and address
    const user = await User.findById(cart.user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the address in the user's location.address array

    let selectedAddress = user.address.find(
      (addr) => addr._id.toString() === shippingAddress
    );
    if (shippingAddress) {
      selectedAddress = shippingAddress;
      //   if (!selectedAddress) {
      //     return res.status(400).json({
      //       success: false,
      //       message: "Invalid shipping address ID",
      //     });
      //   }
    }

    // Create OrderItems from cart items
    const orderItemsIds = await Promise.all(
      cart.items.map(async (item) => {
        const newOrderItem = new OrderItem({
          quantity: item.quantity,
          food: item.food,
          addons: item.addons,
          variations: item.variations,
          totalPrice: item.totalPrice,
        });
        return await newOrderItem.save();
      })
    );

    // Create Order
    const order = new Order({
      orderItems: orderItemsIds,
      shippingAddress: {
        address_label: selectedAddress?.address_label,
        city: selectedAddress?.city,
        state: selectedAddress?.state,
        country: selectedAddress?.country,
        area: selectedAddress?.area,
        landmark: selectedAddress?.landmark,
        alternate_number: selectedAddress?.alternate_number,
      },
      totalAmount: totalPrice,
      paymentMethod,
      mobile: user.mobile,
      user: cart.user,
      cart: cartId,
      status: "Pending",
      delivaryOption,
    });

    const savedOrder = await order.save();

    // Optionally, clear the cart after order creation
    await Cart.findByIdAndDelete(cartId);

    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("user", "name email")
      .populate("cart")
      .populate({
        path: "orderItems",
        populate: { path: "food", select: "name price image" },
      });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

router.get(
  "/orders/status/:status",
  authenticate,
  isRestroAdmin,
  async (req, res) => {
    try {
      const { status } = req.params;
      const validStatuses = [
        "Pending",
        "Confirmed",
        "Cooking",
        "Handover",
        "Cancelled",
      ];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
          validStatuses: validStatuses,
        });
      }

      const orders = await Order.find({ status })
        .populate("user", "name email")
        .populate({
          path: "orderItems",
          populate: { path: "food", select: "name price image" },
        })
        .sort("-createdAt");

      res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
  }
);

// Get all orders (Requires admin access)
router.get("/orders", authenticate, isRestroAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email mobile")
      .populate({
        path: "orderItems",
        populate: { path: "food", select: "name price image" },
      })
      .populate("orderItems", "addons variations quantity")
      .sort("-createdAt");

    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// Get order by ID (Requires user authentication)
router.get("/orders/:id", authenticate, isRestroAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "orderItems",
        populate: [
          { path: "food" }, // Populate orderItems.food
          {
            path: "addons.addon", // Populate orderItems.addons.addon
            select: "variations quantity food", // Include specific fields
          },
        ],
      })
      .populate("user", "name email mobile")
      .sort("-createdAt");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

// Update order status (Requires admin access)
router.put("/orders/:id", isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate({
        path: "orderItems",
        populate: { path: "product", select: "name price image" },
      });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

// Delete order (Requires admin access)
router.delete("/orders/:id", isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await OrderItem.deleteMany({ _id: { $in: order.orderItems } });
    await order.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
});

// Get user orders by status (Requires user authentication)
router.get("/orders/user/:userId/status/:status", isUser, async (req, res) => {
  try {
    const { userId, status } = req.params;
    const validStatuses = [
      "Pending",
      "InProgress",
      "Completed",
      "Delivered",
      "Declined",
      "COD",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
        validStatuses: validStatuses,
      });
    }

    const orders = await Order.find({
      user: userId,
      status: status,
    })
      .populate("user", "name email")
      .populate({
        path: "orderItems",
        populate: { path: "product", select: "name price image" },
      })
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
});

// Get orders statistics by status (Requires admin access)
router.get("/orders/stats/by-status", isAdmin, async (req, res) => {
  try {
    const statusStats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
          totalAmount: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: statusStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to calculate order status statistics",
      error: error.message,
    });
  }
});

export default router;
