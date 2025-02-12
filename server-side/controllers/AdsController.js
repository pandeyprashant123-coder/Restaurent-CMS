import AdsServices from "../services/AdsServices.js";
import xlsx from "xlsx";
import upload from "../middlewares/multer.js";
import Ads from "../models/advertisement.js";

// Create a new menu item
export const createAd = async (req, res) => {
  const uploadFields = [
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ];
  upload.fields(uploadFields)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const Ad = await AdsServices.createAds(
        req.body,
        req.files // Contains the uploaded files
      );
      return res.status(201).json(Ad);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

// Update an existing menu item
export const updateAd = async (req, res) => {
  const { id } = req.params;
  try {
    const Ad = await AdsServices.updateAds(id, req.body);
    res.status(200).json(Ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single menu item by ID
export const getAdById = async (req, res) => {
  const { id } = req.params;
  try {
    const Ad = await AdsServices.getAdById(id);
    res.status(200).json(Ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items
export const getAllAds = async (req, res) => {
  try {
    const Ads = await AdsServices.getAllAds();
    res.status(200).json(Ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu item
export const deleteAd = async (req, res) => {
  const { id } = req.params;
  try {
    const Ad = await AdsServices.deleteAds(id);
    res.status(200).json({ message: "Ad deleted successfully", Ad });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
