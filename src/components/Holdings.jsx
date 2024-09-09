import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetching current user details from cookies token  
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

  // Fetching holdings data once userData is available
  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:3000/allHoldings?user=${userData.id}`) // Passing user ID as a query parameter
        .then((res) => {
          console.log(res.data);  // Debugging purposes
          setAllHoldings(res.data);
        })
        .catch((error) => {
          console.error("Error fetching holdings:", error);
        });
    }
  }, [userData]); // Run this effect when userData is updated

  // Labels and data for the graph
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
