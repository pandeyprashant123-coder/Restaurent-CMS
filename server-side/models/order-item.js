import mongoose from "mongoose";

const variationOptionSchema = new mongoose.Schema(
  {
    name: { type: String },
    additionalPrice: { type: Number },
  },
  { _id: false }
);

const variationSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    options: [variationOptionSchema],
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  addons: [
    {
      addon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addon",
      },
      quantity: Number,
    },
  ],
  totalPrice: {
    type: String,
    required: true,
    min: 1,
  },
  variations: [variationSchema],

  //   price: {
  //     type: Number,
  //     required: true,
  //   },
});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);
