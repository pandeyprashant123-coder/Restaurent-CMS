import express from "express";
import restaurantController from "../controllers/restaurantController.js";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { registerRestaurant } from "../middlewares/RestaurentRegisterMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

const uploadFields = [
  { name: "logo", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "excelData", maxCount: 1 },
];

router.post(
  "/restaurants",
  authenticate,
  upload.fields(uploadFields),
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
