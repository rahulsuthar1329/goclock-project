import React, { useState } from "react";
import "./FullMessage.css";
import { ImCross } from "react-icons/im";

const FullMessage = ({ data, setRenderId }) => {
  const user = JSON.parse(localStorage.getItem("user")).role;
  return (
    <div className={`fullmessage`}>
      <div className="messageBox">
        <div className="heading">
          <h3>Message Details</h3>
          <div className="crossLogo" onClick={() => setRenderId("")}>
            <ImCross />
          </div>
        </div>
        <table className="messageDetails">
          <tbody>
            <tr>
              <td>Order ID</td>
              <td>:</td>
              <td>{data.orderId}</td>
            </tr>
            <tr>
              <td>To</td>
              <td>:</td>
              <td>{data.to}</td>
            </tr>
            <tr>
              <td>From</td>
              <td>:</td>
              <td>{data.from}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>:</td>
              <td>{data.address}</td>
            </tr>
            <tr>
              <td>
                {user === "manufacturer" ? "Transporter" : "Manufacturer"}
              </td>
              <td>:</td>
              <td>
                {user === "manufacturer" ? data.transporter : data.manufacturer}
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>:</td>
              {data.price ? (
                <td>Responded</td>
              ) : (
                <td style={{ color: "red" }}>Not Responded</td>
              )}
            </tr>
            <tr>
              <td>Price</td>
              <td>:</td>
              {data.price ? <td>₹ {data.price}</td> : <td>_</td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullMessage;
