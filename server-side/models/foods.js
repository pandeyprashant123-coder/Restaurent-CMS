import mongoose from "mongoose";

const variationOptionSchema = new mongoose.Schema({
  name: { type: String }, // e.g., "Small"
  additionalPrice: { type: Number }, // Additional price for this option
});

const variationSchema = new mongoose.Schema({
  variationName: { type: String, required: false }, // e.g., "Size"
  required: { type: Boolean, default: false }, // If the variation is mandatory
  options: [variationOptionSchema], // List of options
  selectionType: { type: String, required: false },
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Item name
  description: { type: String, required: true }, // Item description
  image: { type: String }, // Image file path or URL
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: "Category",
    type: String,
    required: true,
  }, // Reference to category

  subCategory: {
    // type: mongoose.Schema.Types.ObjectId,
    // default: null,
    // ref: "SubCategory",
    type: String,
    required: false,
  }, // Reference to subcategory
  foodType: { type: String, required: true }, // e.g., "Vegetarian", "Non-Vegetarian"
  nutrition: { type: String, default: "" }, // Nutritional information
  allergen: { type: String, default: "" }, // Allergen information
  isItHalal: { type: Boolean, default: false }, // Is the item Halal?
  addons: [
    {
      type: mongoose.Schema.Types.ObjectId, // Add-ons can reference another schema
      ref: "Addon",
      required: false,
    },
  ],
  availableTimeStarts: { type: String, required: true }, // Start time (HH:mm:ss)
  availableTimeEnds: { type: String, required: true }, // End time (HH:mm:ss)
  unitPrice: { type: Number, required: true }, // Base price
  discountType: {
    type: String,
    enum: ["Percent", "Amount"],
    default: "",
    required: false,
  }, // Discount type
  discount: { type: String, default: 0 }, // Discount value
  purchaseLimit: { type: String, default: 0 }, // Purchase limit per customer
  stockType: { type: String, default: "" }, // Stock type information
  variationRequired: { type: Boolean, default: false }, // Are variations required?
  variations: [variationSchema], // List of variations
  recommended: { type: Boolean, default: false }, // Is the item recommended?
  status: { type: String, enum: ["active", "inactive"], default: "inactive" }, // Status of the item
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
