import menuItemService from "../services/foodServices.js";
import xlsx from "xlsx";
import upload from "../middlewares/multer.js";

// Create a new menu item
const createMenuItem = async (req, res) => {
  const uploadFields = [
    { name: "foodImage", maxCount: 1 },
    { name: "excelData", maxCount: 1 },
  ];
  upload.fields(uploadFields)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      if (req.files.excelData && req.files.excelData.length > 0) {
        const excelFile = req.files.excelData[0];
        const workbook = xlsx.read(excelFile.buffer, { type: "buffer" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);
        // console.log("Rows from Excel:", data);
        if (data && data.length > 0) {
          const newMenu = await menuItemService.createMenuItemExcel(data);
          return res.status(201).json(newMenu);
        } else {
          return res
            .status(400)
            .json({ message: "No valid data found in the Excel file." });
        }
      } else {
        // Handle case where there is no Excel file
        const newMenuItem = await menuItemService.createMenuItem(
          req.body,
          req.files // Contains the uploaded files
        );
        return res.status(201).json(newMenuItem);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

// Update an existing menu item
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await menuItemService.updateMenuItem(id, req.body);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single menu item by ID
const getMenuItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await menuItemService.getMenuItemById(id);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuItemService.getAllMenuItems();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await menuItemService.deleteMenuItem(id);
    res
      .status(200)
      .json({ message: "Menu item deleted successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createMenuItem,
  updateMenuItem,
  getMenuItemById,
  getAllMenuItems,
  deleteMenuItem,
};
