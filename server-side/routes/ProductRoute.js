import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getBestSellers,
  getProductById,
  getProductsByCategory,
  getRecommendedProducts,
} from "../controllers/ProductController.js";
import upload from "../middlewares/multer.js";
import {
  productIdValidation,
  productValidationRules,
} from "../validation/ProductValidation.js";
import validateRequest from "../middlewares/ValidateRequest.js";
import { isAdmin, isRestroAdmin } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.get("/all_products", getAllProducts);

router.get("/product_by_id/:id", getProductById);

// Product creation route
router.post(
  "/create_product",
  isAdmin,
  isRestroAdmin,
  upload.single("productImage"),
  productValidationRules,
  validateRequest,
  createProduct
);

//edit product
router.put(
  "/update_product/:id",
  isAdmin,
  isRestroAdmin,
  upload.single("productImage"),
  [...productValidationRules, ...productIdValidation],
  validateRequest,
  editProduct
);

//delete product
router.delete(
  "/delete_product/:id",
  isAdmin,
  isRestroAdmin,
  productIdValidation,
  validateRequest,
  deleteProduct
);

router.get("/products/category/:categoryId", getProductsByCategory);
router.get("/products/recommendation/:id", getRecommendedProducts);
router.get("/products/best_selling_products", getBestSellers);

export default router;
