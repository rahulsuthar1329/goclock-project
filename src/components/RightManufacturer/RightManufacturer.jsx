import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Message from "../Message/Message";
import FullMessage from "./../FullMessage/FullMessage";
import axios from "axios";
import "./styles.css";
import { toast } from "react-toastify";

const RightManufacturer = () => {
  const [searchBy, setSearchBy] = useState("");
  const [allData, setAllData] = useState(null);
  const [renderId, setRenderId] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [transporterData, setTransporterData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    let data = null;
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/data/manufacturer");
        data = res.data.filter((obj) => user._id === obj.manufacturer);
        setAllData(data);
        setFilteredData(data);
        console.log(data);
        // const res1 = await axios.get("http://localhost:5000/data/transporter");
        // let result = [{}];
        // for (let i = 0; i < data.length; i++) {
        //   let temp = data[i].orderId;
        //   console.log("temp : ", temp);
        //   for (let j = 0; res1.data.length; j++) {
        //     if (res1.data[j].orderId === temp) {
        //       result.push({ orderId: temp, price: res1.data[j].price });
        //     }
        //   }
        // }
      } catch (error) {
        console.log(error);
        toast.error("Data fetching Error!");
      }
    };
    const getTransporterData = async () => {
      try {
      } catch (error) {
        toast.error("Transporter Data Fetching Error!");
        console.log(error);
      }
    };
    getData();
    getTransporterData();
  }, []);

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleSearch = (e) => {
    if (!searchBy) toast.warn("Please select an option first!");
    else {
      setSearch(e.target.value);
      if (searchBy === "orderId") {
        const results = allData.filter((value) => {
          return value?.orderId?.includes(e.target.value);
        });
        results ? setFilteredData(results) : setFilteredData(allData);
      } else if (searchBy === "to") {
        const results = allData.filter((value) => {
          return value?.to?.includes(e.target.value);
        });
        results ? setFilteredData(results) : setFilteredData(allData);
      } else if (searchBy === "from") {
        const results = allData.filter((value) => {
          return value?.from?.includes(e.target.value);
        });
        results ? setFilteredData(results) : setFilteredData(allData);
      }
    }
  };

  return (
    <div className="rightSidebar">
      <div className="container">
        <h3>Messages</h3>
        <div className="searchSection">
          <div className="searchBar">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
            <div className="searchIcon">
              <BiSearch />
            </div>
          </div>
          <div className="searchBy">
            <div className="radioSection">
              <div className="radio">
                <input
                  type="radio"
                  name="searchBy"
                  id="orderId"
                  value="orderId"
                  onChange={handleChange(setSearchBy)}
                />
                <label htmlFor="orderId">Order ID</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="searchBy"
                  id="to"
                  value="to"
                  onChange={handleChange(setSearchBy)}
                />
                <label htmlFor="to">To</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="searchBy"
                  id="from"
                  value="from"
                  onChange={handleChange(setSearchBy)}
                />
                <label htmlFor="from">From</label>
              </div>
            </div>
          </div>
        </div>
        <div className="listContainer">
          {filteredData &&
            filteredData.map((value, index) => {
              return (
                <div
                  className="msg"
                  key={index}
                  id={index}
                  onClick={(e) => setRenderId(e.currentTarget.id)}
                >
                  <Message data={value} />
                </div>
              );
            })}
          {renderId && (
            <FullMessage
              data={filteredData[renderId]}
              price={500}
              setRenderId={setRenderId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightManufacturer;
