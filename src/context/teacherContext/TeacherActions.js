export const getTeachersStart = () => ({
    type: "GET_TEACHERS_START",
});

export const getTeachersSuccess = (teachers) => ({
    type: "GET_TEACHERS_SUCCESS",
    payload: teachers,
});

export const getTeachersFailure = () => ({
    type: "GET_TEACHERS_FAILURE",
});

export const deleteTeacherStart = () => ({
    type: "DELETE_TEACHER_START",
});

export const deleteTeacherSuccess = (id) => ({
    type: "DELETE_TEACHER_SUCCESS",
    payload: id,
});

export const deleteTeacherFailure = () => ({
    type: "DELETE_TEACHER_FAILURE",
});


export const createTeacherStart = () => ({
    type: "CREATE_TEACHER_START",
});

export const createTeacherSuccess = (teacher) => ({
    type: "CREATE_TEACHER_SUCCESS",
    payload: teacher,
});

export const createTeacherFailure = () => ({
    type: "CREATE_TEACHER_FAILURE",
});

export const updateTeacherStart = () => ({
    type: "UPDATE_TEACHER_START",
});

export const updateTeacherSuccess = (teacher) => ({
    type: "UPDATE_TEACHER_SUCCESS",
    payload: teacher,
});

export const updateTeacherFailure = () => ({
    type: "UPDATE_TEACHER_FAILURE",
});

