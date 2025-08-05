import React, { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import UpdatePriceForm from "./components/UpdatePriceForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);

  const handleGetProduct = () => {
    ProductDetails.fetchProduct(productId, setProduct);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Product Price Dashboard</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleGetProduct}>
          Get Product
        </button>
      </div>

      {product && (
        <>
          <ProductDetails.ProductCard product={product} />
          <UpdatePriceForm productId={productId} setProduct={setProduct} />
        </>
      )}
    </div>
  );
}

export default App;
