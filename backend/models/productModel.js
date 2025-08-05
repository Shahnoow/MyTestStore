const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    current_price: {
      value: { type: Number, required: true },
      currency_code: { type: String, default: "USD" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
