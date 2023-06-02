import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        name === "" ||
        email === "" ||
        password === "" ||
        mobile === "" ||
        address === "" ||
        role === ""
      )
        toast.warn("All the fields are required!");
      else {
        const res = await axios.post("http://localhost:5000/auth/register", {
          name,
          email,
          password,
          address,
          role,
          mobile,
        });
        if (res.status === 201) {
          toast.success("Registered Successfully...");
          setTimeout(() => {
            return navigate("/");
          }, 2000);
        } else if (res.status === 200) {
          toast.error(res.data.msg);
        } else {
          toast.error("Internal Server Error!!");
          console.log(res);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Internal Server Error!");
    }
  };

  return (
    <div className="container">
      <div className="register">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange(setName)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange(setEmail)}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Contact No."
            onChange={handleChange(setMobile)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange(setPassword)}
          />
          <textarea
            name="address"
            id="address"
            placeholder="Address"
            onChange={handleChange(setAddress)}
          ></textarea>
          <div className="radioSection">
            <div className="radio">
              <input
                type="radio"
                name="role"
                id="transporter"
                value="transporter"
                onChange={handleChange(setRole)}
              />
              <label htmlFor="transporter">Transporter</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                name="role"
                id="manufacturer"
                value="manufacturer"
                onChange={handleChange(setRole)}
              />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>
          </div>
          <button type="submit">Submit</button>
          <p>
            Already have an Account?
            <a className="registerNow" href="/">
              {"  "}Login here.
            </a>
          </p>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default Register;
