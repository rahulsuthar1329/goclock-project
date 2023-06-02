import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Select from "../Select";
import "./styles.css";

const LeftTransporter = ({ color }) => {
  const [price, setPrice] = useState("");
  const [select, setSelect] = useState(null);
  const [orders, setOrders] = useState(null);
  const [listData, setListData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/data/manufacturer");
        const data = res.data.filter((obj) => user._id === obj.transporter);
        console.log(data);
        setListData(data);
        const transformedArray = res.data
          .map((obj) => {
            return (
              user._id === obj.transporter && {
                value: obj.orderId,
                label: obj.orderId,
                manufacturer: obj.manufacturer,
              }
            );
          })
          .filter((obj) => obj != false);
        setOrders(transformedArray);
      } catch (error) {
        toast.error("Data Fetching Error!");
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(select, price, user._id);
    try {
      if (!Object.keys(select).length || !price || !user._id) {
        toast.warn("Fill all the fields!");
      } else {
        let res = await axios.post("http://localhost:5000/post/transporter", {
          orderId: select.value,
          price,
          transporter: user._id,
          manufacturer: select.manufacturer,
        });

        res = await axios.post("http://localhost:5000/post/manufacturerprice", {
          orderId: select.value,
          price,
        });

        toast.success("Message Sent Successfully.");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Already Responded or Server Error!");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="register">
        <h2>Transporter</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              width: "250px",
              fontSize: "14px",
            }}
          >
            <Select
              placeholder="Choose Transporter"
              setValue={setSelect}
              options={orders}
            />
          </div>
          <input
            type="text"
            name="price"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default LeftTransporter;
