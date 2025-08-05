const axios = require("axios");
const Product = require("../models/productModel");

exports.getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    // Fetch title from external API
    const productRes = await axios.get(
      `https://fakestoreapi.com/products/${id}`
    );
    const productTitle = productRes.data.title;

    // Fetch price from local DB
    const product = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({ error: "Price info not found in DB" });
    }

    // Combine and send
    res.json({
      id: Number(id),
      title: productTitle,
      current_price: {
        value: product.current_price.value,
        currency_code: product.current_price.currency_code,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProductPrice = async (req, res) => {
  const id = req.params.id;
  const { value, currency_code } = req.body.current_price;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { current_price: { value, currency_code } },
      { new: true, upsert: true }
    );

    res.json({
      message: "Price updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
