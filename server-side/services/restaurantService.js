// Adjust the path based on your project structure
import { error } from "console";
import Restaurant from "../models/Restaurant.js";
import cloudinary from "../config/cloudinaryConfig.js";
import stream from "stream";

// Service to create a restaurant

// Helper function to upload a file to Cloudinary
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
const createRestaurant = async (restaurantData, files, user) => {
  try {
    let restaurant = new Restaurant({ ...restaurantData, user: user.id });

    // Handle logo upload
    if (files.logo && files.logo.length > 0) {
      const logoUploadResult = await uploadToCloudinary(files.logo[0], "logos");
      restaurant.logo = logoUploadResult.secure_url; // Store the logo URL
    }

    // Handle cover photo upload
    if (files.coverPhoto && files.coverPhoto.length > 0) {
      const coverPhotoUploadResult = await uploadToCloudinary(
        files.coverPhoto[0],
        "coverPhotos"
      );
      restaurant.CoverPhoto = coverPhotoUploadResult.secure_url; // Store the cover photo URL
    }
    if (files.panCard && files.panCard.length > 0) {
      const panCardUploadResult = await uploadToCloudinary(
        files.panCard[0],
        "panCards"
      );
      restaurant.panCard = panCardUploadResult.secure_url; // Store the cover photo URL
    }
    //handle register

    return await restaurant.save();
  } catch (error) {
    throw new Error("Error creating restaurant: " + error.message);
  }
};

const createRestaurantFromExcel = async (data) => {
  try {
    const formattedData = data.map((item) => {
      const processedItem = {
        ...item,
        PosSystem: item.PosSystem === "active",
        SelfDeliverySystem: item.SelfDeliverySystem === "active",
        FreeDelivery: item.FreeDelivery === "active",
        TakeAway: item.TakeAway === "active",
        Delivery: item.Delivery === "active",
        Veg: item.Veg === "active",
        NonVeg: item.NonVeg === "active",
        OrderSubscription: item.OrderSubscription === "active",
        RestaurantOpen: item.RestaurantOpen === "active",
        Status: item.Status === "active",
        FoodSection: item.FoodSection === "active",
        DeliveryTime: item.DeliveryTime === "active",
        ReviewsSection: item.ReviewsSection === "active",
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

// Service to get all restaurants
const getAllRestaurants = async () => {
  try {
    return await Restaurant.find({}).populate("categories");
  } catch (error) {
    throw new Error("Error fetching restaurant: " + error.message);
  }
};

// Service to get a single restaurant by ID
const getRestaurantById = async (id) => {
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error("Brand not found");
    }
  } catch (error) {
    throw new Error("Error fetching restaurant: " + error.message);
  }
};

// Service to update a restaurant by ID
const updateRestaurant = async (id, updateData, files) => {
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Update logo if a new file is provided
    if (files.logo && files.logo.length > 0) {
      const logoUploadResult = await uploadToCloudinary(files.logo[0], "logos");
      updateData.logo = logoUploadResult.secure_url; // Update logo URL
    }

    // Update cover photo if a new file is provided
    if (files.coverPhoto && files.coverPhoto.length > 0) {
      const coverPhotoUploadResult = await uploadToCloudinary(
        files.coverPhoto[0],
        "coverPhotos"
      );
      updateData.CoverPhoto = coverPhotoUploadResult.secure_url; // Update cover photo URL
    }

    // Update the restaurant with new data
    Object.assign(restaurant, updateData);
    return await restaurant.save();
  } catch (error) {
    throw new Error("Error updating restaurant: " + error.message);
  }
};

// Service to delete a restaurant by ID
const deleteRestaurant = async (id) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      throw new Error("restaurant not found");
    }
  } catch (error) {
    throw new Error("Error deleting restaurant: " + error.message);
  }
};
// const joinRequest = async(id)=>{
//   try {
//     const restaurant = await Restaurant.findById(id);
//     if (!restaurant) {
//       throw new Error("Restaurant not found");
//     }
//     return await restaurant.save();
//   } catch (error) {

//   }
// }

export default {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createRestaurantFromExcel,
};
