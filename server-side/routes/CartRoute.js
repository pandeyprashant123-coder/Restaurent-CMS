import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/CartController.js";
import { isUser, authenticate } from "../middlewares/AuthMiddleware.js";

const router = Router();

// Add an item to the cart
router.post("/cart", authenticate, addToCart);

// Get the current user's cart
router.get("/cart", authenticate, getCart);

// Remove an item from the cart
router.delete("/cart/:id", authenticate, removeFromCart);
router.delete("/clear-cart", authenticate, clearCart);

// Update the quantity of an item in the cart
router.put("/cart/:id", authenticate, updateCartItem);

export default router;
