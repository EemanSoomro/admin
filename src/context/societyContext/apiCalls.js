import { 
    getSocietysStart, getSocietysFailure, getSocietysSuccess, 
    deleteSocietyStart, deleteSocietyFailure, deleteSocietySuccess, 
    createSocietyFailure, createSocietyStart, createSocietySuccess, 
    updateSocietyStart, updateSocietyFailure, updateSocietySuccess 
} from "./SocietyActions";
import axios from "axios";

const API_URL = process.env.REACT_APP_API + "/societies";
const TOKEN = "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken;

export const getSocietys = async (dispatch) => {
    dispatch(getSocietysStart());
    try {
        const res = await axios.get(API_URL, { headers: { token: TOKEN } });
        dispatch(getSocietysSuccess(res.data));
    } catch (err) {
        dispatch(getSocietysFailure());
    }
};

export const createSociety = async (society, dispatch) => {
    dispatch(createSocietyStart());
    try {
        const res = await axios.post(API_URL, society, { headers: { token: TOKEN } });
        dispatch(createSocietySuccess(res.data));
    } catch (err) {
        dispatch(createSocietyFailure());
    }
};

export const updateSociety = async (id, society, dispatch) => {
    dispatch(updateSocietyStart());
    try {
        const res = await axios.put(`${API_URL}/${id}`, society, { headers: { token: TOKEN } });
        dispatch(updateSocietySuccess(res.data));
    } catch (err) {
        dispatch(updateSocietyFailure());
    }
};

export const deleteSociety = async (societyId, dispatch) => {
    dispatch(deleteSocietyStart());
    try {
        await axios.delete(`${API_URL}/${societyId}`, { headers: { token: TOKEN } });
        dispatch(deleteSocietySuccess(societyId));
    } catch (err) {
        dispatch(deleteSocietyFailure());
    }
};
