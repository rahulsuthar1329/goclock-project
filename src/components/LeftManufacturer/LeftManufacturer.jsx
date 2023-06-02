import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import random from "alphanumeric";
import axios from "axios";
import Select from "../Select";
import "./styles.css";

const LeftManufacturer = () => {
  const [orderId, setOrderId] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [select, setSelect] = useState(null);
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [transporters, setTransporters] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:5000/user/transporter");
      const transformedArray = res.data.map((obj) => {
        return {
          value: obj._id,
          label: obj.name,
        };
      });
      setTransporters(transformedArray);
    };
    getData();
    setOrderId(random(6));
    setAddress(JSON.parse(localStorage.getItem("user"))?.address);
  }, []);

  const quantities = [
    { value: "1", label: "1 ton" },
    { value: "2", label: "2 tons" },
    { value: "3", label: "3 tons" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const manufacturer = JSON.parse(localStorage.getItem("user"))._id;
    try {
      if (!orderId || !to || !from || !select || !quantity || !address)
        toast.warn("Fill all the fields!");
      else {
        const res = await axios.post(
          "http://localhost:5000/post/manufacturer",
          {
            orderId,
            to,
            from,
            quantity: quantity.value,
            address,
            transporter: select.value,
            manufacturer,
          }
        );
        toast.success("Message Sent Successfully.");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Error Occured while sending message!");
      console.log(err);
    }
  };

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  return (
    <div className="container">
      <div className="register">
        <h2>Manufacturer</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="orderId"
            placeholder="Order ID"
            value={orderId}
            disabled
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            value={to}
            onChange={handleChange(setTo)}
          />
          <input
            type="text"
            name="from"
            placeholder="From"
            value={from}
            onChange={handleChange(setFrom)}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            disabled
          />
          <div
            style={{
              width: "250px",
              fontSize: "14px",
            }}
          >
            <Select
              placeholder="Choose Transporter"
              setValue={setSelect}
              options={transporters}
            />
          </div>
          <div
            style={{
              width: "250px",
              fontSize: "14px",
            }}
          >
            <Select
              placeholder="Choose Quantity"
              setValue={setQuantity}
              options={quantities}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default LeftManufacturer;
