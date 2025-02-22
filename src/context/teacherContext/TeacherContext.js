import TeacherReducer from './TeacherReducer';
import { createContext, useReducer } from "react";
const INITIAL_STATE = {
    teachers: [],
    isFetching: false,
    error: false,
};

export const TeacherContext = createContext(INITIAL_STATE);

export const TeacherContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TeacherReducer, INITIAL_STATE);
    
    return (
        <TeacherContext.Provider
            value={{
                teachers: state.teachers,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </TeacherContext.Provider>
    );
}