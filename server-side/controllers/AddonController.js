import Addon from "../models/addons.js";
const createAddon = async (req, res) => {
  try {
    const addon = new Addon(req.body);
    const newAddon = await addon.save();
    return res.status(201).json(newAddon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a single menu item by ID
const getAddonById = async (req, res) => {
  const { id } = req.params;
  try {
    const addon = await Addon.findById(id);
    res.status(200).json(addon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items
const getAllAddons = async (req, res) => {
  try {
    const addons = await Addon.find();
    res.status(200).json(addons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAddon = async (req, res) => {
  const { id } = req.params;
  try {
    const addon = await Addon.findByIdAndDelete(id);
    res.status(200).json({ message: "Addon deleted successfully", addon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createAddon,
  getAddonById,
  getAllAddons,
  deleteAddon,
};
