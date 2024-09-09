import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [userData, setUserData] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState(null);
  const { closeBuyWindow } = useContext(GeneralContext); // Access context value

  // UseEffect to fetch user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", { withCredentials: true });
        if (response.data && response.data.status && response.data.user) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleBuyClick = async () => {
    try {
      // Make the first request to place the order
      const orderResponse = await axios.post("http://localhost:3000/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
        user: userData.id
      });

      // Make the second request to update stock holdings AND Positions
      const stockResponse = await axios.post("http://localhost:3000/buyStock", {
        stockSymbol: uid, // Assuming uid is used as stock symbol here
        quantity: stockQuantity,
        price: stockPrice,
        user: userData.id
      });

      console.log('Buy order response:', orderResponse.data);
      console.log('Stock update response:', stockResponse.data);

      // Close the buy window on success
      closeBuyWindow(); 

    } catch (err) {
      console.error("Error placing order or updating stock:", err);
      setError("Error buying stock: " + err.message);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow(); // Close window
  };

  return (
    <div className="buy-action-container">
      <div className="header">
        <h3>Buy Stock</h3>
      </div>
      <div className="form-group">
        <label htmlFor="qty">Quantity</label>
        <input
          type="number"
          id="qty"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(Number(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          step="0.05"
          value={stockPrice}
          onChange={(e) => setStockPrice(Number(e.target.value))}
        />
      </div>
      <div className="margin-required">
        <span>Margin required: ₹140.65</span>
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleBuyClick}>
          Buy
        </button>
        <button className="btn btn-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BuyActionWindow;
