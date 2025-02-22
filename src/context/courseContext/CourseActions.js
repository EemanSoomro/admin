export const getCoursesStart = () => ({
    type: "GET_COURSES_START",
});

export const getCoursesSuccess = (courses) => ({
    type: "GET_COURSES_SUCCESS",
    payload: courses,
});

export const getCoursesFailure = () => ({
    type: "GET_COURSES_FAILURE",
});

export const deleteCourseStart = () => ({
    type: "DELETE_COURSE_START",
});

export const deleteCourseSuccess = (id) => ({
    type: "DELETE_COURSE_SUCCESS",
    payload: id,
});

export const deleteCourseFailure = () => ({
    type: "DELETE_COURSE_FAILURE",
});


export const createCourseStart = () => ({
    type: "CREATE_COURSE_START",
});

export const createCourseSuccess = (movie) => ({
    type: "CREATE_COURSE_SUCCESS",
    payload: movie,
});

export const createCourseFailure = () => ({
    type: "CREATE_COURSE_FAILURE",
});

export const updateCourseStart = () => ({
    type: "UPDATE_COURSE_START",
});

export const updateCourseSuccess = (course) => ({
    type: "UPDATE_COURSE_SUCCESS",
    payload: course,
});

export const updateCourseFailure = () => ({
    type: "UPDATE_COURSE_FAILURE",
});

