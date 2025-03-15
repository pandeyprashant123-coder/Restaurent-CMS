import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      address_label: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      area: { type: String },
      landmark: { type: String },
      alternate_number: { type: String },
    },
    mobile: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Esewa", "Card"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    delivaryOption: {
      type: String,
      enum: ["Home Delivery", "Take Away", "Dine In"],
      default: "Take Away",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cooking", "Handover", "Cancelled"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });
export const Order = mongoose.model("Order", orderSchema);
