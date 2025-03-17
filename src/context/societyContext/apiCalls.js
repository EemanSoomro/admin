import { 
    getSocietysStart, getSocietysFailure, getSocietysSuccess, 
    deleteSocietyStart, deleteSocietyFailure, deleteSocietySuccess, 
    createSocietyFailure, createSocietyStart, createSocietySuccess, 
    updateSocietyStart, updateSocietyFailure, updateSocietySuccess 
} from "./SocietyActions";
import axios from "axios";

const BASE_URL = "http://localhost:8800/api/societies"; // ✅ Set backend base URL
const TOKEN = "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken;

export const getSocietys = async (dispatch) => {
    dispatch(getSocietysStart());
    try {
        const res = await axios.get(BASE_URL, { headers: { token: TOKEN } });
        dispatch(getSocietysSuccess(res.data));
    } catch (err) {
        dispatch(getSocietysFailure());
    }
};

export const createSociety = async (society, dispatch) => {
    dispatch(createSocietyStart());
    try {
        console.log("Sending request to create society:", society); // Log the data being sent
        const res = await axios.post(BASE_URL, society, { headers: { token: TOKEN } });
        console.log("Response from server:", res.data); // Log the response from the server
        dispatch(createSocietySuccess(res.data));
    } catch (err) {
        console.error("Error creating society:", err); // Log the error if there's one
        dispatch(createSocietyFailure());
    }
};


export const updateSociety = async (id, society, dispatch) => {
    dispatch(updateSocietyStart());
    try {
        const res = await axios.put(`${BASE_URL}/${id}`, society, { headers: { token: TOKEN } });
        dispatch(updateSocietySuccess(res.data));
    } catch (err) {
        dispatch(updateSocietyFailure());
    }
};

export const deleteSociety = async (societyId, dispatch) => {
    dispatch(deleteSocietyStart());
    try {
        await axios.delete(`${BASE_URL}/${societyId}`, { headers: { token: TOKEN } });
        dispatch(deleteSocietySuccess(societyId));
    } catch (err) {
        dispatch(deleteSocietyFailure());
    }
};
