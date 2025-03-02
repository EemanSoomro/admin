import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAnnouncements.css";


const AdminAnnouncements = () => {
  const [pendingAnnouncements, setPendingAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/announcements/pending");
        console.log("Pending Announcements Response:", response.data); // Debugging
        setPendingAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching pending announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAnnouncements();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8800/api/announcements/${id}`, {
        status: newStatus,
      });

      // ✅ Update UI after status change
      setPendingAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((announcement) => announcement._id !== id)
      );

      alert(`Announcement ${newStatus}!`);
    } catch (error) {
      console.error("Error updating announcement status:", error);
    }
  };

  return (
    <div>
      <h2>Pending Announcements</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pendingAnnouncements.length === 0 ? (
        <p>No pending announcements.</p>
      ) : (
        <ul>
          {pendingAnnouncements.map((announcement) => (
            <li key={announcement._id}>
              <h3>{announcement.subject}</h3>
              <p>{announcement.body}</p>
              <p><strong>Type:</strong> {announcement.type}</p>
              <p><strong>Status:</strong> {announcement.status}</p>
              <button onClick={() => handleStatusChange(announcement._id, "approved")}>Approve</button>
              <button onClick={() => handleStatusChange(announcement._id, "rejected")}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminAnnouncements;
