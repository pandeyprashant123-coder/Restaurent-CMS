import mongoose from "mongoose";

const adsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  adType: {
    type: String,
    enum: ["Restaurant Promotion", "Video Promotion"],
    default: "Restaurant Promotion",
    required: false,
  },
  dateRange: Date,
});
