const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    products: [
      {
        productId: { type: String },
        productImage: { type: String },
        productName: { type: String },
        productPrice: { type: Number },
        productCount: {
          type: Number,
          default: 1,
        },
      },
    ],
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
