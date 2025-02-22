import "./event.css";
import { useLocation } from "react-router-dom";
import { updateEvent } from "../../../context/eventContext/apiCalls";
import { useContext, useState, useEffect } from "react";
import { EventContext } from "../../../context/eventContext/EventContext";
import { useHistory } from "react-router-dom";


export default function Event() {
  // Update Event
  const History = useHistory();
  const { dispatch } = useContext(EventContext);
  const location = useLocation();
  const event = location.event;
  const [inputs, setInputs] = useState(null);
  const [societies, setSocieties] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    updateEvent(event._id, inputs, dispatch);
    History.push("/");
  };

  // Use Effect to get societies
  useEffect(() => {
    const getSocieties = async () => {
      try {
        const res = await fetch("/societies", {
          method: "GET",
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const data = await res.json();
        setSocieties(data);
      } catch (err) {
        console.log(err);
      }
    };
    getSocieties();
  }, []);
  console.log(societies);


  return (
    <div className="event">
      <div className="eventTitleContainer">
        <h1 className="eventTitle">Event</h1>
      </div>
      <div className="eventTop">
        <div className="eventTopRight">
          <div className="eventInfoTop">
            <span className="eventName">{event.name}</span>
          </div>
          <div className="eventInfoBottom">
            <div className="eventInfoItem">
              <span className="eventInfoKey">id:</span>
              <span className="eventInfoValue">{event._id}</span>
            </div>
            <div className="eventInfoItem">
              <span className="eventInfoKey">Society:</span>
              <span className="eventInfoValue">{event.societyCode}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="eventBottom">
        <form className="eventForm">
          <div className="eventFormLeft">
            <label>Event Name</label>
            <input type="text" placeholder={event.name} name="name" onChange={handleChange} />
            <label>Code</label>
            <select name="societyCode" id="societyCode" onChange={handleChange}>
              <option value={event.societyCode}>{event.societyCode}</option>
              {
                societies.map((society) => (
                  <option value={society.code}>{society.code}</option>
                ))
              }
            </select>
            <label>About</label>
            <textarea type="text" placeholder={event.description} name="description" onChange={handleChange} />
          </div>
          <div className="eventFormRight">
            <button className="addEventButton" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
