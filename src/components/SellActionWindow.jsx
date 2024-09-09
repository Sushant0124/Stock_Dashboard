import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [userData, setUserData] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [error, setError] = useState(null);
  const { closeSellWindow } = useContext(GeneralContext);

  useEffect(() => {
    // Fetch the user's holdings to check available quantity
    axios
      .get(`http://localhost:3000/allHoldings/${uid}`)
      .then((response) => {
        const holding = response.data;
        setAvailableQuantity(holding.qty || 0);
      })
      .catch((error) => {
        console.error("Error fetching holdings:", error);
        setError("Error fetching holdings. Please try again.");
      });
  }, [uid]);

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

  const handleSellClick = async () => {
    if (stockQuantity > availableQuantity) {
      alert("You don't have enough stock to sell.");
      return;
    }

    try {
      // Place the sell order
      const orderResponse = await axios.post("http://localhost:3000/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
        user: userData.id
      });

      console.log('Sell order response:', orderResponse.data);

      // Update stock holdings
      const updateResponse = await axios.post("http://localhost:3000/sellStock", {
        stockSymbol: uid,
        quantity: stockQuantity,
        price: stockPrice,
        user: userData.id
      });

      console.log('Stock update response:', updateResponse.data);

      // Close the sell window on success
      closeSellWindow();

    } catch (err) {
      console.error("Error placing order:", err);
      setError("Error selling stock: " + err.message);
    }
  };

  const handleCancelClick = () => {
    closeSellWindow(); // Close window
  };

  return (
    <div className="sell-action-container">
      <div className="header">
        <h3>Sell Stock</h3>
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
        <button className="btn btn-primary" onClick={handleSellClick}>
          Sell
        </button>
        <button className="btn btn-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SellActionWindow;
