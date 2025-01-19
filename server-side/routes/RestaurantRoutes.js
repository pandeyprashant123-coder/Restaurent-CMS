import express from "express";
import restaurantController from "../controllers/restaurantController.js";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { registerRestaurant } from "../middlewares/RestaurentRegisterMiddleware.js";

const router = express.Router();

router.post(
  "/restaurants",
  authenticate,
  registerRestaurant,
  restaurantController.createRestaurant
);
router.get("/restaurants", restaurantController.getAllRestaurants);
router.get("/restaurants/:id", restaurantController.getRestaurantById);
router.put(
  "/restaurants/:id",
  authenticate,
  restaurantController.updateRestaurant
);
router.delete(
  "/restaurants/:id",
  authenticate,
  restaurantController.deleteRestaurant
);

export default router;
