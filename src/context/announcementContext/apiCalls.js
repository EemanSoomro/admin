import axios from "axios";

// Get All Announcements (Admin Panel)
export const getAllAnnouncements = async (dispatch) => {
  dispatch({ type: "GET_ANNOUNCEMENTS_START" });
  try {
    const res = await axios.get("/announcements/admin"); 
    dispatch({ type: "GET_ANNOUNCEMENTS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_ANNOUNCEMENTS_FAILURE" });
  }
};

// Create Announcement
export const createAnnouncement = async (announcement, dispatch) => {
  try {
    const res = await axios.post("/announcements", { ...announcement, status: "pending" });
    dispatch({ type: "CREATE_ANNOUNCEMENT_SUCCESS", payload: res.data });
    getAllAnnouncements(dispatch); 
  } catch (err) {
    console.log(err);
  }
};

// Approve or Reject Announcement
export const updateAnnouncementStatus = async (id, status, dispatch) => {
  try {
    const res = await axios.put(`/announcements/${id}`, { status });
    dispatch({ type: "UPDATE_ANNOUNCEMENT_SUCCESS", payload: res.data });
    getAllAnnouncements(dispatch); 
  } catch (err) {
    console.log(err);
  }
};

// ✅ Fixed Delete Announcement
export const deleteAnnouncement = async (id, dispatch) => {
  try {
    const res = await axios.delete(`/announcements/${id}`);
    if (res.status === 200) {
      dispatch({ type: "DELETE_ANNOUNCEMENT_SUCCESS", payload: id });
    }
  } catch (err) {
    console.error("Delete Error:", err);
  }
};
