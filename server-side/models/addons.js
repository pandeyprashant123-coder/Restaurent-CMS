import mongoose from "mongoose";

const addonSchema = new mongoose.Schema({
  name: String,
  price: String,
  stockType: String,
  stock: String,
});

const Addon = mongoose.model("Addon", addonSchema);
export default Addon;
