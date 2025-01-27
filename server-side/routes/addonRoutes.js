import express from "express";

import AddonController from "../controllers/AddonController.js";
import {
  authenticate,
  isAdmin,
  isRestroAdmin,
  isAdminOrRestroAdmin,
} from "../middlewares/AuthMiddleware.js";
const router = express.Router();

router.post(
  "/addons",
  authenticate,
  isAdminOrRestroAdmin,
  AddonController.createAddon
);
router.get("/addons/:id", AddonController.getAddonById); // Get a menu item by ID
router.get("/addons", AddonController.getAllAddons); // Get all menu items
router.delete(
  "/addons/:id",
  authenticate,
  isAdminOrRestroAdmin,
  AddonController.deleteAddon
); // Delete a menu item

export default router;
