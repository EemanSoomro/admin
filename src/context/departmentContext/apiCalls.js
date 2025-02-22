import { getDepartmentsStart, getDepartmentsFailure, getDepartmentsSuccess, deleteDepartmentStart, deleteDepartmentFailure, deleteDepartmentSuccess,createDepartmentFailure,createDepartmentStart,createDepartmentSuccess,updateDepartmentStart,updateDepartmentFailure,updateDepartmentSuccess } from "./DepartmentActions";
import axios from 'axios'

export const getDepartments = async (dispatch) => {
    dispatch(getDepartmentsStart);
    try {
        const res = await axios.get(process.env.REACT_APP_API + "/departments", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(getDepartmentsSuccess(res.data));
    } catch (err) {
        dispatch(getDepartmentsFailure());
    }
};

export const createDepartment = async (department, dispatch) => {
    dispatch(createDepartmentStart);
    try {
        console.log(department);
        const res = await axios.post(process.env.REACT_APP_API + "/departments", department, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(createDepartmentSuccess(res.data));
    } catch (err) {
        dispatch(createDepartmentFailure());
    }
};

// updateDepartment using axios, dispatching updateDepartmentStart, updateDepartmentSuccess, updateDepartmentFailure, and passing in Department id, and Department object to update
export const updateDepartment = async (id, department, dispatch) => {
    dispatch(updateDepartmentStart);
    try {
        const res = await axios.put(process.env.REACT_APP_API + "/departments/" + id, department, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(updateDepartmentSuccess(res.data));
    } catch (err) {
        dispatch(updateDepartmentFailure());
    }
};



export const deleteDepartment = async (departmentId, dispatch) => {
    dispatch(deleteDepartmentStart);
    try {
        await axios.delete(process.env.REACT_APP_API + "/departments/" + departmentId, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        dispatch(deleteDepartmentSuccess(departmentId));
    } catch (err) {
        dispatch(deleteDepartmentFailure());
    }
};


