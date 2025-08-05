// controllers/productController.js
const Product = require("../models/Product"); // Assuming Product model is in models/Product.js

exports.updateProductPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
