import { getCoursesStart, getCoursesFailure, getCoursesSuccess, deleteCourseStart, deleteCourseFailure, deleteCourseSuccess,createCourseFailure,createCourseStart,createCourseSuccess,updateCourseStart,updateCourseFailure,updateCourseSuccess } from "./CourseActions";
import axios from 'axios'

export const getCourses = async (dispatch) => {
    dispatch(getCoursesStart);
    try {
        const res = await axios.get(process.env.REACT_APP_API + "/courses", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getCoursesSuccess(res.data));
    } catch (err) {
        dispatch(getCoursesFailure());
    }
};

export const createCourse = async (course, dispatch) => {
    dispatch(createCourseStart);
    try {
        console.log(course);
        const res = await axios.post(process.env.REACT_APP_API + "/courses", course, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createCourseSuccess(res.data));
    } catch (err) {
        dispatch(createCourseFailure());
    }
};

// updateCourse using axios, dispatching updateCourseStart, updateCourseSuccess, updateCourseFailure, and passing in Course id, and Course object to update
export const updateCourse = async (id, course, dispatch) => {
    dispatch(updateCourseStart);
    try {
        const res = await axios.put(process.env.REACT_APP_API + "/courses/" + id, course, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateCourseSuccess(res.data));
    } catch (err) {
        dispatch(updateCourseFailure());
    }
};



export const deleteCourse = async (courseId, dispatch) => {
    dispatch(deleteCourseStart);
    try {
        await axios.delete(process.env.REACT_APP_API + "/courses/" + courseId, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteCourseSuccess(courseId));
    } catch (err) {
        dispatch(deleteCourseFailure());
    }
};


