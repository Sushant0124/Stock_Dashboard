import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const response = await axios.get("http://localhost:3000/user/profile", { withCredentials: true });
        console.log("Response received:", response);
        if (response.data && response.data.status && response.data.user) {
          console.log("User data:", response.data.user);
          setUserData(response.data.user);
        } else {
          console.log("No user data in response or invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserData();
  }, []);

  // Fetching positions once userData is available
  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:3000/allPositions?user=${userData.id}`) // Passing user ID as a query parameter
        .then((res) => {
          console.log(res.data);  // Debugging purposes
          setPositions(res.data);
        })
        .catch((error) => {
          console.error("Error fetching positions:", error);
          setPositions([]);
        });
    }
  }, [userData]); // Only fetch positions when userData is updated

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg ? stock.avg.toFixed(2) : "N/A"}</td>
                  <td>{stock.price ? stock.price.toFixed(2) : "N/A"}</td>
                  <td className={profClass}>
                    {stock.avg && stock.price ? (curValue - stock.avg * stock.qty).toFixed(2) : "N/A"}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
