import React from "react";
import axios from "axios";

const ProductDetails = {
  fetchProduct: async (id, setProduct) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      alert("Product not found.");
      setProduct(null);
    }
  },

  productCard: ({ product }) => (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Title: {product.title}</h5>
        <p className="card-text">
          Price: {product.current_price.value}{" "}
          {product.current_price.currency_code}
        </p>
      </div>
    </div>
  ),
};

export default ProductDetails;
