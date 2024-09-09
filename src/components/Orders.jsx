import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css"; // Import your CSS file for styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Fetch user data on component mount
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

  // Fetch orders only when userData is available
  useEffect(() => {
    if (userData) {
      console.log("Fetching orders for user:", userData.id);
      axios
        .get(`http://localhost:3000/allOrders`, {
          params: { user: userData.id }, // Passing user ID in query params
        })
        .then((response) => {
          setOrders(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setLoading(false);
        });
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <p>You haven't placed any orders today</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="orders-table">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Name</th>
          <th>Price</th>
          <th>Mode</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          const date = new Date(order.time).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
          const time = new Date(order.time).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          return (
            <tr key={index}>
              <td>{date}</td>
              <td>{time}</td>
              <td>{order.name}</td>
              <td>{order.price.toFixed(2)}</td>
              <td className={order.mode === "BUY" ? "buy-mode" : "sell-mode"}>{order.mode}</td>
              <td>{order.qty}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
</div>


      <div className="row">
        <div className="col">
          <h5>Total Orders: {orders.length}</h5>
          <p>Manage your stock orders</p>
        </div>
      </div>
    </>
  );
};

export default Orders;
