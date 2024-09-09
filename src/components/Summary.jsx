import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph"; 
import './Sumarry.css';  // Add your CSS for custom styling

const Summary = () => {
  const [userData, setUserData] = useState(null);
  const [holdingsData, setHoldingsData] = useState(null);
  const [positionsData, setPositionsData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", { withCredentials: true });
        if (response.data && response.data.status && response.data.user) {
          console.log(response.data.user);
          setUserData(response.data.user);
          
          fetchAggregatedData(response.data.user.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        setError("Error fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  const fetchAggregatedData = useCallback(async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/aggregatedData/${userId}`, { withCredentials: true });
      if (response.data) {
        setHoldingsData({
          labels: response.data.holdingsData.map(item => item.label),
          datasets: [{
            label: 'Holdings',
            data: response.data.holdingsData.map(item => item.value),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        });

        setPositionsData({
          labels: response.data.positionsData.map(item => item.label),
          datasets: [{
            label: 'Positions',
            data: response.data.positionsData.map(item => item.value),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          }]
        });
      }
    } catch (error) {
      console.error("Error fetching aggregated data:", error.response ? error.response.data : error.message);
      setError("Error fetching aggregated data.");
    }
  }, []);

  // Conditional rendering to avoid accessing userData or graphData when they're null
  if (error) {
    return <p>{error}</p>;  // Show error message
  }

  if (!userData || !holdingsData || !positionsData) {
    return <p>Loading...</p>;  // Loading state before the data is fetched
  }

  return (
    <div className="summary-container">
      {/* User greeting */}
      <div className="username">
        <h6>Hi, {userData.username}!</h6>
      </div>
<hr></hr>
      <div className="section equity-section">
        {/* Equity section */}
        <p>Equity</p>
        <div className="data">
          <div className="first">
            <h3>1L</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>1L</span></p>
          </div>
          {/* <a href="#" className="view-statement">View statement</a> */}
        </div>
      </div>
<hr></hr>
      <div className="section commodity-section">
        {/* Commodity section */}
        <p>Commodity</p>
        <div className="data">
          <div className="first">
            <h3>50k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>50k</span></p>
          </div>
          {/* <a href="#" className="view-statement">View statement</a> */}
        </div>
      </div>
<hr></hr>
      {/* Holdings section */}
      <div className="section holdings-section">
        <p>Holdings ({userData.holdings ? userData.holdings.length : 0})</p>
        <div className="data">
          <VerticalGraph data={holdingsData} />
        </div>
      </div>
<hr></hr>
      {/* Positions section */}
      <div className="section positions-section">
        <p>Positions ({userData.positions ? userData.positions.length : 0})</p>
        <div className="data">
          <VerticalGraph data={positionsData} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
