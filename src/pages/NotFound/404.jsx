import React from "react";
import "./404.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Page Not Found!</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default NotFound;
