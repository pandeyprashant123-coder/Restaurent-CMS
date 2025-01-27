import { toTitleCase } from "../config/function.js";
import categoryModel from "../models/Categories.js";
import cloudinary from "../config/cloudinaryConfig.js"; // Import Cloudinary config

class Category {
  // Get all categories (Main Categories)
  async getAllCategory(req, res, next) {
    try {
      const categories = await categoryModel
        .find({ parentCategory: null })
        .sort({ _id: -1 });

      return res.status(200).json({
        success: true,
        message: categories.length
          ? "Categories retrieved successfully"
          : "No categories found",
        data: categories,
        count: categories.length,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get Subcategories (or child categories) under a specific category
  async getSubcategories(req, res, next) {
    try {
      const { parentCategoryId, subCategoryId } = req.params;

      // Check if the parent category exists
      const parentCategory = await categoryModel.findById(parentCategoryId);
      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Parent category not found",
        });
      }

      let categories;

      if (subCategoryId) {
        // Fetch child categories under a specific subcategory
        const subCategory = await categoryModel.findById(subCategoryId);
        if (!subCategory) {
          return res.status(404).json({
            success: false,
            message: "Subcategory not found",
          });
        }

        categories = await categoryModel
          .find({ parentCategory: subCategoryId })
          .sort({ _id: -1 });
      } else {
        // Fetch subcategories under the main category
        categories = await categoryModel
          .find({ parentCategory: parentCategoryId })
          .sort({ _id: -1 });
      }

      return res.status(200).json({
        success: true,
        message: categories.length
          ? "Categories retrieved successfully"
          : "No categories found",
        data: categories,
        count: categories.length,
        parentCategory: parentCategory.cName,
      });
    } catch (err) {
      next(err);
    }
  }

  // Add a new category (Main Category, Subcategory, or Child Category)
  async postAddCategory(req, res, next) {
    try {
      const { cName, cDescription, parentCategory } = req.body;

      // Check if a category with the same name already exists under the same parent
      const existingCategory = await categoryModel.findOne({
        cName: new RegExp(`^${cName}$`, "i"), // Case-insensitive check
        parentCategory: parentCategory || null,
      });

      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Category already exists at this level",
        });
      }

      // If parentCategory is provided, verify it exists (main category or subcategory)
      if (parentCategory) {
        const parentExists = await categoryModel.findById(parentCategory);
        if (!parentExists) {
          return res.status(404).json({
            success: false,
            message: "Parent category not found",
          });
        }
      }

      let cImageUrl = null;

      // Handle image upload to Cloudinary
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "categories_images",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(req.file.buffer);
        });

        cImageUrl = result.secure_url; // The URL of the uploaded image
      }

      // Create the new category (main, subcategory, or child category)
      const newCategory = new categoryModel({
        cName: toTitleCase(cName),
        cDescription,
        cStatus,
        parentCategory: parentCategory || null,
        cImage: cImageUrl || null,
      });

      await newCategory.save();

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  // Edit an existing category (Main Category, Subcategory, or Child Category)
  async putEditCategory(req, res, next) {
    try {
      const { cName, cDescription, cStatus, parentCategory } = req.body;
      const { cId } = req.params; // Extract cId from URL parameters

      // Check if cId is provided
      if (!cId) {
        return res.status(400).json({
          success: false,
          message: "Category ID is required",
        });
      }

      // If name is being updated, check for duplicates
      if (cName) {
        const existingCategory = await categoryModel.findOne({
          cName: new RegExp(`^${cName}$`, "i"),
          _id: { $ne: cId },
          parentCategory: parentCategory || null,
        });

        if (existingCategory) {
          return res.status(409).json({
            success: false,
            message: "Category name already exists at this level",
          });
        }
      }

      // If changing parent category, verify it exists
      if (parentCategory) {
        const parentExists = await categoryModel.findById(parentCategory);
        if (!parentExists) {
          return res.status(404).json({
            success: false,
            message: "Parent category not found",
          });
        }
      }

      // Update the category
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        cId,
        {
          ...(cName && { cName: toTitleCase(cName) }),
          ...(cDescription && { cDescription }),
          ...(cStatus && { cStatus }),
          ...(parentCategory !== undefined && {
            parentCategory: parentCategory || null,
          }),
          updatedAt: Date.now(),
        },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get all nested categories with dynamic structure (Main Categories → Subcategories → Child Categories)
  async getNestedCategories(req, res, next) {
    try {
      // Fetch all categories
      const categories = await categoryModel.find().lean(); // Use `lean` for better performance

      // Helper function to build the nested structure
      const buildNestedCategories = (parentId = null, level = 0) => {
        return categories
          .filter(
            (category) => String(category.parentCategory) === String(parentId)
          )
          .map((category) => ({
            ...category,
            level,
            childcategories: buildNestedCategories(category._id, level + 1), // Recursively find child categories
          }));
      };

      // Build the full nested structure starting from main categories (where parentCategory is null)
      const nestedCategories = buildNestedCategories();

      return res.status(200).json({
        success: true,
        message: "Nested categories fetched successfully",
        data: nestedCategories,
      });
    } catch (error) {
      console.error("Error fetching nested categories:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch nested categories",
        error: error.message,
      });
    }
  }

  // Delete a category (Main Category, Subcategory, or Child Category)
  async deleteCategory(req, res, next) {
    try {
      const { cId } = req.params;

      // Check if category or any descendant subcategories exist
      const hasSubcategories = await categoryModel.exists({
        parentCategory: cId,
      });
      if (hasSubcategories) {
        return res.status(409).json({
          success: false,
          message:
            "Cannot delete category with existing subcategories. Please delete subcategories first.",
        });
      }

      const deletedCategory = await categoryModel.findByIdAndDelete(cId);
      if (!deletedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: deletedCategory,
      });
    } catch (err) {
      next(err);
    }
  }
}

const categoryController = new Category();
export default categoryController;
