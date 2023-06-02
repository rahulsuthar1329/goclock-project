import React, { useEffect, useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "./../../components/Navbar/Navbar";
import LeftManufacturer from "./../../components/LeftManufacturer/LeftManufacturer";
import RightManufacturer from "./../../components/RightManufacturer/RightManufacturer";

function Manufacturer() {
  const [display, setDisplay] = useState(false);
  const [lowerDimension, setLowerDimesion] = useState(
    window.innerWidth > 992 ? false : true
  );
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
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
    } else if (JSON.parse(user).role === "transporter") {
      navigate("/transporter");
    }
  });

  return (
    <div className="manufacturer">
      <Navbar />
      {!lowerDimension && (
        <div className="section">
          <div className={`leftSidebar`}>
            <LeftManufacturer />
          </div>
          <div className={`rightSidebar`}>
            <RightManufacturer />
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
              <LeftManufacturer />
            </div>
          ) : (
            <div className={`rightSidebar`}>
              <RightManufacturer />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Manufacturer;
