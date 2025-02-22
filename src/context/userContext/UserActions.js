export const getUsersStart = () => ({
    type: "GET_USERS_START",
});

export const getUsersSuccess = (Users) => ({
    type: "GET_USERS_SUCCESS",
    payload: Users,
});

export const getUsersFailure = () => ({
    type: "GET_USERS_FAILURE",
});
