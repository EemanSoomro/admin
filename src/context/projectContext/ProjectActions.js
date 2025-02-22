export const getProjectsStart = () => ({
    type: "GET_PROJECTS_START",
});

export const getProjectsSuccess = (Projects) => ({
    type: "GET_PROJECTS_SUCCESS",
    payload: Projects,
});

export const getProjectsFailure = () => ({
    type: "GET_PROJECTS_FAILURE",
});
