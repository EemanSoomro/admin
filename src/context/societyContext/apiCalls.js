import { getSocietysStart, getSocietysFailure, getSocietysSuccess, deleteSocietyStart, deleteSocietyFailure, deleteSocietySuccess,createSocietyFailure,createSocietyStart,createSocietySuccess,updateSocietyStart,updateSocietyFailure,updateSocietySuccess } from "./SocietyActions";
import axios from 'axios'

export const getSocietys = async (dispatch) => {
    dispatch(getSocietysStart);
    try {
        const res = await axios.get(process.env.REACT_APP_API + "/societies", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getSocietysSuccess(res.data));
    } catch (err) {
        dispatch(getSocietysFailure());
    }
};

export const createSociety = async (society, dispatch) => {
    dispatch(createSocietyStart);
    try {
        console.log(society);
        const res = await axios.post(process.env.REACT_APP_API + "/societies", society, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createSocietySuccess(res.data));
    } catch (err) {
        dispatch(createSocietyFailure());
    }
};

// updateSociety using axios, dispatching updateSocietyStart, updateSocietySuccess, updateSocietyFailure, and passing in Society id, and Society object to update
export const updateSociety = async (id, society, dispatch) => {
    dispatch(updateSocietyStart);
    try {
        const res = await axios.put(process.env.REACT_APP_API + "/societies/" + id, society, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateSocietySuccess(res.data));
    } catch (err) {
        dispatch(updateSocietyFailure());
    }
};



export const deleteSociety = async (societyId, dispatch) => {
    dispatch(deleteSocietyStart);
    try {
        await axios.delete(process.env.REACT_APP_API + "/societies/" + societyId, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteSocietySuccess(societyId));
    } catch (err) {
        dispatch(deleteSocietyFailure());
    }
};


