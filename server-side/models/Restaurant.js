import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    ownerFirstName: { type: String, required: true },
    ownerLastName: { type: String, required: true },
    restaurantName: { type: String, required: true },
    CoverPhoto: { type: String, required: false }, // URL to the cover photo
    logo: { type: String, required: false }, // URL to the logo
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    cuisine: { type: [String], default: [] },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    zone: { type: String, default: null },
    // zone_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    Address: { type: String, required: true },
    panNumber: { type: String, required: true },
    panCard: { type: String, required: false },
    date_of_birth: { type: String, required: true },
    Slug: { type: String, required: false }, // Slug for URL
    MinimumOrderAmount: { type: Number, required: false },
    Comission: { type: Number, required: false },
    Tax: { type: Number, required: true },
    DeliveryTime: { type: Number, required: false }, // In minutes
    MinimumDeliveryFee: { type: Number, required: false },
    MaximumDeliveryFee: { type: Number, required: false },
    RestaurantModel: { type: String, required: false }, // Example: "Dine-in", "Delivery-only"
    ScheduleOrder: { type: Boolean, default: false },
    FreeDelivery: { type: Boolean, default: false },
    TakeAway: { type: Boolean, default: false },
    Delivery: { type: Boolean, default: false },
    Veg: { type: Boolean, default: false },
    NonVeg: { type: Boolean, default: false },
    OrderSubscription: { type: String, required: false }, // Example: "Monthly", "Yearly"
    Status: { type: String, required: false }, // Example: "Open", "Closed"
    FoodSection: { type: Boolean, default: true }, // Whether food section is enabled
    ReviewsSection: { type: Boolean, default: true }, // Whether reviews section is enabled
    SelfDeliverySystem: { type: Boolean, default: false },
    PosSystem: { type: Boolean, default: false },
    RestaurantOpen: { type: Boolean, default: true }, // Whether the restaurant is open
    JoinStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    }, // Whether the restaurant is approved by the company or not
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
