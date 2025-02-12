import restaurantService from "../services/restaurantService.js";
import upload from "../middlewares/multer.js";
import readXlsxFile from "read-excel-file/node";
import xlsx from "xlsx";
import Restaurant from "../models/Restaurant.js";

// Controller to create a new restaurant
const createRestaurant = async (req, res) => {
  // const uploadFields = [
  //   { name: "logo", maxCount: 1 },
  //   { name: "coverPhoto", maxCount: 1 },
  //   { name: "panCard", maxCount: 1 },
  //   { name: "excelData", maxCount: 1 },
  // ];

  // upload.fields(uploadFields)(req, res, async (err) => {
  //   if (err) {
  //     return res.status(400).json({ message: err.message });
  //   }

  try {
    if (req.files && req.files.excelData && req.files.excelData.length > 0) {
      const excelFile = req.files.excelData[0];
      const workbook = xlsx.read(excelFile.buffer, { type: "buffer" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(worksheet);
      // console.log("Rows from Excel:", data);
      if (data && data.length > 0) {
        const newRestaurant = await restaurantService.createRestaurantFromExcel(
          data
        );
        return res.status(201).json(newRestaurant);
      } else {
        return res
          .status(400)
          .json({ message: "No valid data found in the Excel file." });
      }
    }
    // Handle case where there is no Excel file
    const newRestaurant = await restaurantService.createRestaurant(
      req.body,
      req.files || {}, // Contains the uploaded files
      req.restaurant
    );
    return res.status(201).json(newRestaurant);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  // });
};

// Controller to get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a restaurant by ID
const updateRestaurant = async (req, res) => {
  const uploadFields = [
    { name: "logo", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ];

  upload.fields(uploadFields)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      const updatedRestaurant = await restaurantService.updateRestaurant(
        req.params.id,
        req.body,
        req.files // Contains the uploaded files
      );
      if (!updatedRestaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.status(200).json(updatedRestaurant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// Controller to delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await restaurantService.deleteRestaurant(
      req.params.id
    );
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
