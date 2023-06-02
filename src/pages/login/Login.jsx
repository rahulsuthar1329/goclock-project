import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "manufacturer") navigate("/manufacturer");
    else if (user?.role === "transporter") navigate("/transporter");
  }, []);

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (email === "" || password === "")
        toast.warn("All the fields are required!");
      else {
        const res = await axios.post(
          "https://goclock-project-backend.vercel.app/auth/login",
          {
            email,
            password,
          }
        );
        if (res.status === 200) {
          const user = res?.data?.user;
          localStorage.setItem("user", JSON.stringify(user));
          if (user.role === "manufacturer") navigate("/manufacturer");
          if (user.role === "transporter") navigate("/transporter");
        }
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 400) toast.error(error.response.data.msg);
      else toast.error("Internal Server Error!");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            onChange={handleChange(setEmail)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange(setPassword)}
          />
          <button type="submit">Submit</button>
          <p>
            Don't have Account?
            <a className="loginNow" href="/register">
              {"  "}Register here.
            </a>
          </p>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default Login;
