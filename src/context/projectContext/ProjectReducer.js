const ProjectReducer = (state, action) => {
    switch (action.type) {
        case 'GET_PROJECTS_START':
            return {
                projects: [],
                isFetching: true,
                error: false,
            };
        case 'GET_PROJECTS_SUCCESS':
            return {
                projects: action.payload,
                isFetching: false,
                error: false,

            };
        case 'GET_PROJECTS_FAILURE':
            return {
                projects: [],
                isFetching: false,
                error: true,
            };
        default:
            return {...state};
    }
}
export default ProjectReducer;
