const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  qty: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    default: 0,
  },
  total_Price: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
});

const ShoppingCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [CartItemSchema],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  grand_total: {
    type: Number,
    default: 0,
  },
});

ShoppingCartSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ShoppingCartSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("CartItem", ShoppingCartSchema);
