import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

// Helper function to check if string is a valid MongoDB ObjectId
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// Validation for adding a new category (supports main categories and subcategories)
const validateCategory = [
  body("cName")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("cDescription")
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("parentCategory")
    .optional({ nullable: true })
    .custom((value) => {
      if (value && !isValidObjectId(value)) {
        throw new Error("Invalid parent category ID format");
      }
      return true;
    })
    .withMessage("Parent category must be a valid ObjectId if provided"),

  validateResults,
];

// Validation for editing a category (supports updating main and child categories)
const validateEditCategory = [
  param("cId")
    .notEmpty()
    .withMessage("Category ID is required")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid category ID format");
      }
      return true;
    }),

  body("cName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("cDescription")
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("cStatus")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either active or inactive"),

  body("parentCategory")
    .optional({ nullable: true })
    .custom((value) => {
      if (value && !isValidObjectId(value)) {
        throw new Error("Invalid parent category ID format");
      }
      return true;
    })
    .withMessage("Parent category must be a valid ObjectId if provided"),

  validateResults,
];

// Validation for getting subcategories (ensures valid parent category ID)
const validateSubcategory = [
  param("parentCategoryId")
    .notEmpty()
    .withMessage("Parent category ID is required")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid parent category ID format");
      }
      return true;
    }),

  validateResults,
];

// Validation for deleting a category
const validateDeleteCategory = [
  param("cId")
    .notEmpty()
    .withMessage("Category ID is required")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid category ID format");
      }
      return true;
    }),

  validateResults,
];

// Helper function to validate results and handle errors
function validateResults(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.param,
        location: error.location,
        message: error.msg,
      })),
    });
  }
  next();
}

// Global error handler for validation errors
const errorHandler = (err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    details: err,
  });

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
      error: `Invalid ${err.path}: ${err.value}`,
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate Entry",
      error: `${Object.keys(err.keyValue)} already exists`,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export {
  validateCategory,
  validateEditCategory,
  validateSubcategory,
  validateDeleteCategory,
  errorHandler,
};
