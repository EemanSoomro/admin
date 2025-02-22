import "./newEvent.css";
import { useState } from "react";
import { createEvent } from "../../../context/eventContext/apiCalls";
import { EventContext } from "../../../context/eventContext/EventContext";
import { useContext,useEffect} from "react";
import { useHistory } from "react-router-dom";
// Import Navigate from react-router-dom
export default function NewEvent() {
  const History = useHistory();
  const { dispatch } = useContext(EventContext);
  const [inputs, setInputs] = useState(null);
  const [societies, setSocieties] = useState([]);

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    createEvent(inputs, dispatch);
    resetInputFields();
    History.push("/");

  };

  const resetInputFields = () => {
    setInputs(null);
  };



  return (
    <div className="newEvent">
      <h1 className="addEventTitle">New Event</h1>
      <form className="addEventForm">
        <div className="addEventItem">
          <label>Society</label>
          {/* Select with 2 options */}
          <select name="societyCode" id="societyCode" onChange={handleChange}>
            <option value="0">Select Society</option>
            {societies.map((society) => (
              <option value={society.code}>{society.name}</option>
            ))}
          </select>
        </div>
        <div className="addEventItem">
          <label>Name</label>
          <input type="text" placeholder="Spotlight" id="name" name="name" onChange={handleChange} />
        </div>
        <div className="addEventItem">
          <label>Description</label>
          {/* TeaxtArea */}
          <textarea placeholder="" rows="2" id="description" name="description" onChange={handleChange} />
        </div>
        <button className="addEventButton" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
