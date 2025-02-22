export const getSocietysStart = () => ({
    type: "GET_SOCIETYS_START",
});

export const getSocietysSuccess = (societys) => ({
    type: "GET_SOCIETYS_SUCCESS",
    payload: societys,
});

export const getSocietysFailure = () => ({
    type: "GET_SOCIETYS_FAILURE",
});

export const deleteSocietyStart = () => ({
    type: "DELETE_SOCIETY_START",
});

export const deleteSocietySuccess = (id) => ({
    type: "DELETE_SOCIETY_SUCCESS",
    payload: id,
});

export const deleteSocietyFailure = () => ({
    type: "DELETE_SOCIETY_FAILURE",
});


export const createSocietyStart = () => ({
    type: "CREATE_SOCIETY_START",
});

export const createSocietySuccess = (society) => ({
    type: "CREATE_SOCIETY_SUCCESS",
    payload: society,
});

export const createSocietyFailure = () => ({
    type: "CREATE_SOCIETY_FAILURE",
});

export const updateSocietyStart = () => ({
    type: "UPDATE_SOCIETY_START",
});

export const updateSocietySuccess = (society) => ({
    type: "UPDATE_SOCIETY_SUCCESS",
    payload: society,
});

export const updateSocietyFailure = () => ({
    type: "UPDATE_SOCIETY_FAILURE",
});

