export const getProjectsStart = () => ({
    type: "GET_PROJECTS_START",
  });
  
  export const getProjectsSuccess = (projects) => ({
    type: "GET_PROJECTS_SUCCESS",
    payload: projects,
  });
  
  export const getProjectsFailure = () => ({
    type: "GET_PROJECTS_FAILURE",
  });
  export const createProjectStart = () => ({
    type: "CREATE_PROJECT_START",
  });
  
  export const createProjectSuccess = (project) => ({
    type: "CREATE_PROJECT_SUCCESS",
    payload: project,
  });
  
  export const createProjectFailure = () => ({  // 👈 Yeh export hona chahiye
    type: "CREATE_PROJECT_FAILURE",
  });
  // DELETE PROJECT ACTIONS
export const deleteProjectStart = () => ({
  type: "DELETE_PROJECT_START",
});

export const deleteProjectSuccess = (projectId) => ({
  type: "DELETE_PROJECT_SUCCESS",
  payload: projectId,
});

export const deleteProjectFailure = () => ({
  type: "DELETE_PROJECT_FAILURE",
});
