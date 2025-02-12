import express from "express";

import {
  authenticate,
  isAdmin,
  isRestroAdmin,
  isAdminOrRestroAdmin,
} from "../middlewares/AuthMiddleware.js";
import {
  createAd,
  deleteAd,
  getAdById,
  getAllAds,
  updateAd,
} from "../controllers/AdsController.js";

const router = express.Router();

router.post("/advertisement", authenticate, isAdminOrRestroAdmin, createAd); // Create a new menu item
router.put("/advertisement/:id", authenticate, isAdminOrRestroAdmin, updateAd); // Update a menu item
router.get("/advertisement/:id", getAdById); // Get a menu item by ID
router.get("/advertisement", getAllAds); // Get all menu items
router.delete(
  "/advertisement/:id",
  authenticate,
  isAdminOrRestroAdmin,
  deleteAd
); // Delete a menu item

export default router;
