import DepartReducer from './DepartmentReducer';
import { createContext, useReducer } from "react";
const INITIAL_STATE = {
    departments: [],
    isFetching: false,
    error: false,
};

export const DepartmentContext = createContext(INITIAL_STATE);

export const DepartmentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DepartReducer, INITIAL_STATE);
    
    return (
        <DepartmentContext.Provider
            value={{
                departments: state.departments,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </DepartmentContext.Provider>
    );
}