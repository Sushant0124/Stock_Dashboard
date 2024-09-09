import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileDropDown from "./ProfileDropDown";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

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


  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };


  const handleLogout = () => {
    // removeCookie("token");
    // Redirect to the login page after logout
    window.location.href = "http://localhost:5173";
};

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile-container" >
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">
              {userData ? userData.username.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="username">{userData ? userData.username : "User"}</span>
          </div>
          {isProfileDropdownOpen && userData && (
            <div className="dropdown-wrapper">
              <ProfileDropDown userData={userData} onLogout={handleLogout} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
