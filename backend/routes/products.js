const express = require("express");
const router = express.Router();
const {
  getProductById,
  updateProductPrice,
} = require("../controllers/productController");

router.get("/products/:id", getProductById);
router.put("/products/:id", updateProductPrice);

module.exports = router;
