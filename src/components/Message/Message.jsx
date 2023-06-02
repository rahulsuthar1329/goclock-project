import React, { useState } from "react";
import FullMessage from "../FullMessage/FullMessage";
import "./styles.css";
import { ImCross } from "react-icons/im";
const Message = ({ data }) => {
  const [render, setRender] = useState("hide");
  return (
    <div className={`message`} onClick={() => setRender("")}>
      <div className="row">
        <h4>Order ID : {data.orderId}</h4>
        {data.price ? (
          <span>Responded</span>
        ) : (
          <span style={{ color: "red" }}>Not Responded</span>
        )}
      </div>
      <div className="row">
        <p>To : {data.to}</p>
        <p>
          Price : {data.price ? <span>₹ {data.price}</span> : <span>_</span>}
        </p>
      </div>
    </div>
  );
};

export default Message;
// style={`height:${height}`}
