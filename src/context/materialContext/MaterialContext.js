import MaterialReducer from "./MaterialReducer";
import { createContext, useReducer } from "react";
const INITIAL_STATE = {
    materials: [],
    isFetching: false,
    error: false,
};

export const MaterialContext = createContext(INITIAL_STATE);

export const MaterialContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MaterialReducer, INITIAL_STATE);
    
    return (
        <MaterialContext.Provider
            value={{
                materials: state.materials,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </MaterialContext.Provider>
    );
}