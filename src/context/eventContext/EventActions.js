export const getEventsStart = () => ({
    type: "GET_EVENTS_START",
});

export const getEventsSuccess = (events) => ({
    type: "GET_EVENTS_SUCCESS",
    payload: events,
});

export const getEventsFailure = () => ({
    type: "GET_EVENTS_FAILURE",
});

export const deleteEventStart = () => ({
    type: "DELETE_EVENT_START",
});

export const deleteEventSuccess = (id) => ({
    type: "DELETE_EVENT_SUCCESS",
    payload: id,
});

export const deleteEventFailure = () => ({
    type: "DELETE_EVENT_FAILURE",
});


export const createEventStart = () => ({
    type: "CREATE_EVENT_START",
});

export const createEventSuccess = (event) => ({
    type: "CREATE_EVENT_SUCCESS",
    payload: event,
});

export const createEventFailure = () => ({
    type: "CREATE_EVENT_FAILURE",
});

export const updateEventStart = () => ({
    type: "UPDATE_EVENT_START",
});

export const updateEventSuccess = (event) => ({
    type: "UPDATE_EVENT_SUCCESS",
    payload: event,
});

export const updateEventFailure = () => ({
    type: "UPDATE_EVENT_FAILURE",
});

