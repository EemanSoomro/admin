import "./announcementNew.css";
import { useState } from "react";
import { createAnnouncement } from "../../../context/announcementContext/apiCalls";
import { AnnouncementContext } from "../../../context/announcementContext/AnnouncementContext";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function AnnouncementNew() {
  const History = useHistory();
  const { dispatch } = useContext(AnnouncementContext);
  const [inputs, setInputs] = useState(null);
  
  // Hardcoded types instead of API call
  const types = [
    { type: "Academic Announcements" },
    { type: "Admissions" },
    { type: "General Announcements" },
    { type: "Events and Seminars" },
    { type: "General Announcements" },
    { type: "Scholarships and Financial Aid" },
    { type: "Job Opportunities" },
    { type: "Student Societies & Clubs Updates" },
    { type: "Important Deadlines" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnnouncement(inputs, dispatch);
    resetInputFields();
    History.push("/");
  };

  const resetInputFields = () => {
    setInputs(null);
  };

  return (
    <div className="announcementNew">
      <h1 className="addAnnouncementTitle">New Announcement</h1>
      <form className="addAnnouncementForm">
        <div className="addAnnouncementItem">
          <label>Type</label>
          <select name="type" id="type" onChange={handleChange}>
            <option value="0">Select Type</option>
            {types.map((type) => (
              <option key={type.type} value={type.type}>{type.type}</option>
            ))}
          </select>
        </div>
        <div className="addAnnouncementItem">
          <label>Subject</label>
          <input type="text" placeholder="Enter Subject" id="subject" name="subject" onChange={handleChange} />
        </div>
        <div className="addAnnouncementItem">
          <label>Body</label>
          <textarea placeholder="Enter Body" rows="2" id="body" name="body" onChange={handleChange} />
        </div>
        <button className="addAnnouncementButton" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
