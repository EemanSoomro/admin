import axios from "axios";

// Get Announcements
export const getAnnouncements = async (dispatch) => {
  dispatch({ type: "GET_ANNOUNCEMENTS_START" });
  try {
    const res = await axios.get("/announcements");
    dispatch({ type: "GET_ANNOUNCEMENTS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_ANNOUNCEMENTS_FAILURE" });
  }
};

// Create Announcement
export const createAnnouncement = async (announcement, dispatch) => {
  try {
    const res = await axios.post("/announcements", announcement);
    dispatch({ type: "CREATE_ANNOUNCEMENT_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// Delete Announcement
export const deleteAnnouncement = async (id, dispatch) => {
  try {
    await axios.delete(`/announcements/${id}`);
    dispatch({ type: "DELETE_ANNOUNCEMENT_SUCCESS", payload: id });
  } catch (err) {
    console.log(err);
  }
};

// Update Announcement
export const updateAnnouncement = async (id, updatedData, dispatch) => {
  try {
    const res = await axios.put(`/announcements/${id}`, updatedData);
    dispatch({ type: "UPDATE_ANNOUNCEMENT_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
