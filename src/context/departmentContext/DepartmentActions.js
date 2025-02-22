export const getDepartmentsStart = () => ({
    type: "GET_DEPARTMENTS_START",
});

export const getDepartmentsSuccess = (departments) => ({
    type: "GET_DEPARTMENTS_SUCCESS",
    payload: departments,
});

export const getDepartmentsFailure = () => ({
    type: "GET_DEPARTMENTS_FAILURE",
});

export const deleteDepartmentStart = () => ({
    type: "DELETE_DEPARTMENT_START",
});

export const deleteDepartmentSuccess = (id) => ({
    type: "DELETE_DEPARTMENT_SUCCESS",
    payload: id,
});

export const deleteDepartmentFailure = () => ({
    type: "DELETE_DEPARTMENT_FAILURE",
});


export const createDepartmentStart = () => ({
    type: "CREATE_DEPARTMENT_START",
});

export const createDepartmentSuccess = (department) => ({
    type: "CREATE_DEPARTMENT_SUCCESS",
    payload: department,
});

export const createDepartmentFailure = () => ({
    type: "CREATE_DEPARTMENT_FAILURE",
});

export const updateDepartmentStart = () => ({
    type: "UPDATE_DEPARTMENT_START",
});

export const updateDepartmentSuccess = (department) => ({
    type: "UPDATE_DEPARTMENT_SUCCESS",
    payload: department,
});

export const updateDepartmentFailure = () => ({
    type: "UPDATE_DEPARTMENT_FAILURE",
});

