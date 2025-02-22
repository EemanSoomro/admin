import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./AuthActions";
export const loginCall = async (userCredential, dispatch) => {
    dispatch(loginStart);
    try {
        const res = await axios.post(process.env.REACT_APP_API + "/auth/login", userCredential);
        dispatch(loginSuccess(res.data));
        res.data.isAdmin && dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
    };
