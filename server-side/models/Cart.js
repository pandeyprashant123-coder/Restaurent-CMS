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

const cartItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
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
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    totalQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Automatically calculate total quantity of items in the cart before saving
cartSchema.pre("save", function (next) {
  this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
