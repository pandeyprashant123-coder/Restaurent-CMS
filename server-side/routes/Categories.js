import express from 'express';
import categoryController from '../controllers/Categories.js';
import upload from '../middlewares/multer.js'; // Middleware for image uploads
import { isAdmin } from '../middlewares/AuthMiddleware.js';
import {
  validateCategory,
  validateEditCategory,
  validateDeleteCategory,
  errorHandler,
} from '../validation/CategoryValidation.js';

const router = express.Router();


// Get all categories with their nested subcategories and child categories
router.get('/categories', categoryController.getNestedCategories);

// Add a new category (main, sub, or child based on parentCategory)
router.post(
  '/categories',
  upload.single('cImage'),
  isAdmin,
  validateCategory,
  categoryController.postAddCategory
);

// Edit an existing category
router.put(
  '/categories/:cId',
  upload.single('cImage'),
  isAdmin,
  validateEditCategory,
  categoryController.putEditCategory
);

// Delete a category
router.delete(
  '/categories/:cId',
  isAdmin,
  validateDeleteCategory,
  categoryController.deleteCategory
);

// Apply error handling middleware
router.use(errorHandler);

export default router;
