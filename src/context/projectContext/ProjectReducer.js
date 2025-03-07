const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECTS_START":
      return { ...state, isFetching: true, error: false };
    case "GET_PROJECTS_SUCCESS":
      return { ...state, projects: action.payload, isFetching: false, error: false };
    case "GET_PROJECTS_FAILURE":
      return { ...state, isFetching: false, error: true };
    default:
      return state;
  }
};

export default ProjectReducer;
