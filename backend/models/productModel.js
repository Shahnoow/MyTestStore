const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  current_price: {
    value: Number,
    currency_code: { type: String, default: "USD" },
  },
});

module.exports = mongoose.model("Product", productSchema);
