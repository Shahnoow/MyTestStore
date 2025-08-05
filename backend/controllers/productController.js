const axios = require("axios");
const Product = require("../models/productModel");

// ✅ Get product by ID
exports.getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    // ✅ Fetch title from external API
    const productRes = await axios.get(
      `https://fakestoreapi.com/products/${id}`
    );
    const productTitle = productRes.data.title;

    // ✅ Fetch price from local DB
    const product = await Product.findOne({ id: Number(id) });

    if (!product) {
      return res
        .status(404)
        .json({ error: "Price info not found in local DB" });
    }

    // ✅ Combine and send response
    res.json({
      id: Number(id),
      title: productTitle,
      current_price: {
        value: product.current_price.value,
        currency_code: product.current_price.currency_code,
      },
    });
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// ✅ Update product price
exports.updateProductPrice = async (req, res) => {
  const id = req.params.id;
  const { value, currency_code } = req.body.current_price;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: Number(id) },
      { current_price: { value, currency_code } },
      { new: true, upsert: true } // upsert creates if not exists
    );

    res.json({
      message: "Price updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating price:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};
