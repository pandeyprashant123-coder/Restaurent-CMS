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
  startDate: Date,
  endDate: Date,
  review: String,
  rating: String,
  profileImage: String,
  coverImage: String,
  status: {
    type: String,
    enum: ["Approved", "Pending", "Expired"],
    default: "Pending",
    required: false,
  },
});

const Ads = mongoose.model("Ads", adsSchema);
export default Ads;
