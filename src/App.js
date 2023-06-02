import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Transporter from "./pages/Dashboard/Transporter";
import Manufacturer from "./pages/Dashboard/Manufacturer";
import NotFound from "./pages/NotFound/404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="transporter" element={<Transporter />} />
          <Route path="manufacturer" element={<Manufacturer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
