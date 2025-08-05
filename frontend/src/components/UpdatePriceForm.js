import React, { useState } from "react";
import axios from "axios";

function UpdatePriceForm({ productId, setProduct }) {
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        {
          current_price: {
            value: parseFloat(price),
            currency_code: currency,
          },
        }
      );

      setProduct(res.data.product);
      alert("Price updated!");
    } catch (err) {
      alert("Update failed.");
    }
  };

  return (
    <div className="card p-3">
      <h5>Update Price</h5>
      <input
        type="number"
        className="form-control mb-2"
        placeholder="New Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select
        className="form-select mb-3"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="PKR">PKR</option>
        <option value="EUR">EUR</option>
      </select>
      <button className="btn btn-success" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
}

export default UpdatePriceForm;
