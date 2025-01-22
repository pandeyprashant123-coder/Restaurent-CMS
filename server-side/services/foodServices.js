import cloudinary from "../config/cloudinaryConfig.js";
import stream from "stream";
import MenuItem from "../models/foods.js";

// Create a new menu item

const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder || "brands", // Specify the folder
        width: 500,
        height: 500,
        crop: "limit", // Crop to fit
      },
      (error, result) => {
        if (error) {
          return reject("Cloudinary upload failed: " + error.message);
        }
        resolve(result);
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};
const createMenuItem = async (menuItemData, files) => {
  try {
    const menuItem = new MenuItem(menuItemData);
    // Handle logo upload

    if (files.foodImage && files.foodImage.length > 0) {
      const UploadResult = await uploadToCloudinary(
        files.foodImage[0],
        "foodImages"
      );
      menuItem.image = UploadResult.secure_url; // Store the logo URL
    }

    return await menuItem.save();
  } catch (error) {
    throw new Error("Error creating menu item: " + error.message);
  }
};

const createMenuItemExcel = async (data) => {
  try {
    const formattedData = data.map((item) => {
      const processedItem = {
        ...item,
        recommended: item.recommended === "active",
      };

      // Remove `_id` if it is null or undefined
      if (!item._id) {
        delete processedItem._id;
      }

      return processedItem;
    });

    // Construct bulk write operations
    const bulkWriteOperations = formattedData.map((item) => ({
      updateOne: {
        filter: { restaurantName: item.restaurantName }, // Ensure `_id` exists in the item, or use another unique identifier
        update: { $set: item },
        upsert: true, // Create a new document if no match is found
      },
    }));

    // Perform the bulk write operation
    const newRestaurants = await Restaurant.bulkWrite(bulkWriteOperations);
    return newRestaurants;
  } catch (error) {
    throw new Error(
      "Error saving restaurants from Excel data: " + error.message
    );
  }
};

// Update an existing menu item
const updateMenuItem = async (id, menuItemData) => {
  console.log(menuItemData);
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(id, menuItemData, {
      new: true,
    });
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw new Error("Error updating menu item: " + error.message);
  }
};

// Get a single menu item by ID
const getMenuItemById = async (id) => {
  try {
    const menuItem = await MenuItem.findById(id).populate(
      "category subCategory addons"
    );
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw new Error("Error retrieving menu item: " + error.message);
  }
};

// Get all menu items
const getAllMenuItems = async () => {
  try {
    return await MenuItem.find().populate("category subCategory addons");
  } catch (error) {
    throw new Error("Error retrieving menu items: " + error.message);
  }
};

// Delete a menu item
const deleteMenuItem = async (id) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw new Error("Error deleting menu item: " + error.message);
  }
};

export default {
  createMenuItem,
  updateMenuItem,
  getMenuItemById,
  getAllMenuItems,
  deleteMenuItem,
  createMenuItemExcel,
};
