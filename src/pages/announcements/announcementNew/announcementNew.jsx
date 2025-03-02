import "./announcementNew.css";
import { useState, useContext } from "react";
import { createAnnouncement } from "../../../context/announcementContext/apiCalls";
import { AnnouncementContext } from "../../../context/announcementContext/AnnouncementContext";
import { useHistory } from "react-router-dom";
import swal from "sweetalert"; // ✅ Popup Alert

export default function AnnouncementNew() {
  const history = useHistory();
  const { dispatch } = useContext(AnnouncementContext);
  const [inputs, setInputs] = useState({ type: "", subject: "", body: "" });

  const types = [
    { type: "Academic Announcements" },
    { type: "Admissions" },
    { type: "General Announcements" },
    { type: "Events and Seminars" },
    { type: "Scholarships and Financial Aid" },
    { type: "Job Opportunities" },
    { type: "Student Societies & Clubs Updates" },
    { type: "Important Deadlines" },
  ];

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAnnouncement(inputs, dispatch);

    // ✅ Popup: Show Success Message
    swal("Success!", "Announcement Added Successfully!", "success");
  };

  return (
    <div className="announcementNew">
      <h1 className="addAnnouncementTitle">New Announcement</h1>
      <form className="addAnnouncementForm">
        <div className="addAnnouncementItem">
          <label>Type</label>
          <select name="type" id="type" onChange={handleChange}>
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type.type} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
        <div className="addAnnouncementItem">
          <label>Subject</label>
          <input type="text" placeholder="Enter Subject" name="subject" onChange={handleChange} />
        </div>
        <div className="addAnnouncementItem">
          <label>Body</label>
          <textarea placeholder="Enter Body" rows="2" name="body" onChange={handleChange} />
        </div>
        <button className="addAnnouncementButton" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
