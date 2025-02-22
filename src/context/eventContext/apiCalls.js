import { getEventsStart, getEventsFailure, getEventsSuccess, deleteEventStart, deleteEventFailure, deleteEventSuccess,createEventFailure,createEventStart,createEventSuccess,updateEventStart,updateEventFailure,updateEventSuccess } from "./EventActions";
import axios from 'axios'

export const getEvents = async (dispatch) => {
    dispatch(getEventsStart);
    try {
        const res = await axios.get(process.env.REACT_APP_API + "/events", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getEventsSuccess(res.data));
    } catch (err) {
        dispatch(getEventsFailure());
    }
};

export const createEvent = async (event, dispatch) => {
    dispatch(createEventStart);
    try {
        console.log(event);
        const res = await axios.post(process.env.REACT_APP_API + "/events", event, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createEventSuccess(res.data));
    } catch (err) {
        dispatch(createEventFailure());
    }
};

// updateEvent using axios, dispatching updateEventStart, updateEventSuccess, updateEventFailure, and passing in Event id, and Event object to update
export const updateEvent = async (id, event, dispatch) => {
    dispatch(updateEventStart);
    try {
        const res = await axios.put(process.env.REACT_APP_API + "/events/" + id, event, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateEventSuccess(res.data));
    } catch (err) {
        dispatch(updateEventFailure());
    }
};



export const deleteEvent = async (eventId, dispatch) => {
    dispatch(deleteEventStart);
    try {
        await axios.delete(process.env.REACT_APP_API + "/events/" + eventId, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteEventSuccess(eventId));
    } catch (err) {
        dispatch(deleteEventFailure());
    }
};


