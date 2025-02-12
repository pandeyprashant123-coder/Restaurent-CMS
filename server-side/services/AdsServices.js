import cloudinary from "../config/cloudinaryConfig.js";
import stream from "stream";
import Ads from "../models/advertisement.js";

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
const createAds = async (AdsData, files) => {
  try {
    const Ad = new Ads(AdsData);
    // Handle logo upload

    if (files.profileImage && files.profileImage.length > 0) {
      const UploadResult = await uploadToCloudinary(
        files.profileImage[0],
        "AdImages"
      );
      Ad.profileImage = UploadResult.secure_url; // Store the logo URL
    }
    if (files.coverImage && files.coverImage.length > 0) {
      const UploadResult = await uploadToCloudinary(
        files.coverImage[0],
        "AdImages"
      );
      Ad.coverImage = UploadResult.secure_url; // Store the logo URL
    }

    return await Ad.save();
  } catch (error) {
    throw new Error("Error creating Ads: " + error.message);
  }
};

// Update an existing menu item
const updateAds = async (id, adData) => {
  try {
    const Ad = await Ads.findByIdAndUpdate(id, adData, {
      new: true,
    });
    if (!Ad) {
      throw new Error("Ads not found");
    }
    return Ad;
  } catch (error) {
    throw new Error("Error updating Ad: " + error.message);
  }
};

// Get a single menu item by ID
const getAdsById = async (id) => {
  try {
    const Ad = await Ads.findById(id);
    if (!menuItem) {
      throw new Error("Ad not found");
    }
    return Ad;
  } catch (error) {
    throw new Error("Error retrieving menu item: " + error.message);
  }
};

// Get all menu items
const getAllAds = async () => {
  try {
    return await Ads.find();
  } catch (error) {
    throw new Error("Error retrieving Ads: " + error.message);
  }
};

// Delete a menu item
const deleteAds = async (id) => {
  try {
    const Ad = await Ads.findByIdAndDelete(id);
    if (!Ad) {
      throw new Error("Ad not found");
    }
    return Ad;
  } catch (error) {
    throw new Error("Error deleting Ad: " + error.message);
  }
};

export default {
  createAds,
  updateAds,
  getAdsById,
  getAllAds,
  deleteAds,
};
