import axios from "axios";
import { 
  getProjectsStart, getProjectsSuccess, getProjectsFailure, 
  createProjectStart, createProjectSuccess, createProjectFailure, 
  deleteProjectStart, deleteProjectSuccess, deleteProjectFailure 
} from "./ProjectActions";

const API_BASE_URL = "http://localhost:8800/api"; // Backend API URL

// 📌 Fetch all projects
export const fetchProjects = async (dispatch) => {
  dispatch(getProjectsStart());
  try {
    const res = await axios.get(`${API_BASE_URL}/projects`);
    console.log("📥 Projects Fetched:", res.data);
    dispatch(getProjectsSuccess(res.data));
  } catch (error) {
    console.error("❌ Error fetching projects:", error.response?.data || error.message);
    dispatch(getProjectsFailure());
  }
};

// 📌 Create a new project
export const createProject = async (projectData, dispatch) => {
  console.log("📤 Sending Project Data:", projectData); // ✅ Debugging
  dispatch(createProjectStart());

  try {
    const res = await axios.post(`${API_BASE_URL}/projects`, projectData);
    console.log("✅ Project Created:", res.data);
    dispatch(createProjectSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("❌ Error creating project:", error.response?.data || error.message);
    dispatch(createProjectFailure());
  }
};

// 📌 Delete a project
export const deleteProject = async (projectId, dispatch) => {
  dispatch(deleteProjectStart());
  try {
    await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
    console.log(`✅ Project Deleted: ${projectId}`);
    dispatch(deleteProjectSuccess(projectId));
  } catch (error) {
    console.error("❌ Error deleting project:", error.response?.data || error.message);
    dispatch(deleteProjectFailure());
  }
};

// 📌 Update a project
export const updateProject = async (projectId, updatedData, dispatch) => {
  dispatch({ type: "UPDATE_PROJECT_START" });
  try {
    const res = await axios.put(`${API_BASE_URL}/projects/${projectId}`, updatedData);
    console.log("✅ Project Updated:", res.data);
    dispatch({ type: "UPDATE_PROJECT_SUCCESS", payload: res.data });
    return res.data;
  } catch (error) {
    console.error("❌ Error updating project:", error.response?.data || error.message);
    dispatch({ type: "UPDATE_PROJECT_FAILURE" });
  }
};
