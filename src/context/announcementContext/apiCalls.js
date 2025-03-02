import axios from "axios";

const BASE_URL = "http://localhost:8800/api"; // ✅ Set backend base URL

// ✅ Get All Announcements (Admin Panel)
export const getAllAnnouncements = async (dispatch) => {
  dispatch({ type: "GET_ANNOUNCEMENTS_START" });
  try {
    const res = await axios.get(`${BASE_URL}/announcements/admin`);
    dispatch({ type: "GET_ANNOUNCEMENTS_SUCCESS", payload: res.data });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    dispatch({ type: "GET_ANNOUNCEMENTS_FAILURE" });
  }
};

// ✅ Create Announcement
export const createAnnouncement = async (announcement, dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/announcements`, { 
      ...announcement, 
      status: "pending" 
    });
    dispatch({ type: "CREATE_ANNOUNCEMENT_SUCCESS", payload: res.data });
    getAllAnnouncements(dispatch);
  } catch (err) {
    console.error("Error creating announcement:", err);
  }
};

// ✅ Approve or Reject Announcement
export const updateAnnouncementStatus = async (id, status, dispatch) => {
  try {
    const res = await axios.put(`${BASE_URL}/announcements/${id}`, { status });
    dispatch({ type: "UPDATE_ANNOUNCEMENT_SUCCESS", payload: res.data });
    getAllAnnouncements(dispatch);
  } catch (err) {
    console.error("Error updating announcement status:", err);
  }
};

// ✅ Fixed Delete Announcement
export const deleteAnnouncement = async (id, dispatch) => {
  dispatch({ type: "DELETE_ANNOUNCEMENT_START" });
  try {
    const res = await axios.delete(`${BASE_URL}/announcements/${id}`);
    if (res.status === 200) {
      dispatch({ type: "DELETE_ANNOUNCEMENT_SUCCESS", payload: id });
      getAllAnnouncements(dispatch);
    } else {
      throw new Error("Failed to delete announcement");
    }
  } catch (err) {
    console.error("Delete Error:", err);
    dispatch({ type: "DELETE_ANNOUNCEMENT_FAILURE" });
  }
};
