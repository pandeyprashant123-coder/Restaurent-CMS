import express from "express";
import menuItemController from "../controllers/foodController.js";
import {
  authenticate,
  isAdmin,
  isRestroAdmin,
  isAdminOrRestroAdmin,
} from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post(
  "/foods",
  authenticate,
  isAdminOrRestroAdmin,
  menuItemController.createMenuItem
); // Create a new menu item
router.put(
  "/foods/:id",
  authenticate,
  isAdminOrRestroAdmin,
  menuItemController.updateMenuItem
); // Update a menu item
router.get("/foods/:id", menuItemController.getMenuItemById); // Get a menu item by ID
router.get(
  "/foods/restaurants/:restroId",
  menuItemController.getMenuItemByRestro
);
router.get(
  "/foods/categories/:category",
  menuItemController.getMenuItemByCategories
); // Get all menu items
router.get("/foods", menuItemController.getAllMenuItems); // Get all menu items
router.delete(
  "/foods/:id",
  authenticate,
  isAdminOrRestroAdmin,
  menuItemController.deleteMenuItem
); // Delete a menu item

export default router;
