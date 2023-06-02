import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    return navigate("/");
  };

  return (
    <div className="navbar">
      <h2>GoClock</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
