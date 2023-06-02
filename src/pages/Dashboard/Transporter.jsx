import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LeftTransporter from "./../../components/LeftTransporter/LeftTransporter";
import Navbar from "./../../components/Navbar/Navbar";
import RightTransporter from "./../../components/RightTransporter/RightTransporter";
import "./styles.css";

function Transporter() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [display, setDisplay] = useState(false);
  const [lowerDimension, setLowerDimesion] = useState(false);
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 992) return setLowerDimesion(true);
      else return setLowerDimesion(false);
    };
    window.addEventListener("resize", handleWindowResize);
    if (!user) {
      toast.error(
        "Access Denied! Login or Register Before Accessing this page."
      );
      navigate("/");
    } else if (JSON.parse(user).role === "manufacturer")
      navigate("/manufacturer");
  }, []);
  return (
    <div className="manufacturer">
      <Navbar />
      {!lowerDimension && (
        <div className="section">
          <div className={`leftSidebar`}>
            <LeftTransporter />
          </div>
          <div className={`rightSidebar`}>
            <RightTransporter />
          </div>
        </div>
      )}
      {lowerDimension && (
        <div className="section">
          <div
            className="switch"
            style={{ backgroundColor: `${display ? "#0c657d" : "#28a745"}` }}
          >
            <button onClick={() => setDisplay(false)}>Sender</button>
            <button onClick={() => setDisplay(true)}>Messages</button>
          </div>
          {!display ? (
            <div className={`leftSidebar`}>
              <LeftTransporter />
            </div>
          ) : (
            <div className={`rightSidebar`}>
              <RightTransporter />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Transporter;
