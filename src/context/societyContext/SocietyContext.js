import SocietyReducer from './SocietyReducer';
import { createContext, useReducer } from "react";
const INITIAL_STATE = {
    societys: [],
    isFetching: false,
    error: false,
};

export const SocietyContext = createContext(INITIAL_STATE);

export const SocietyContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SocietyReducer, INITIAL_STATE);
    
    return (
        <SocietyContext.Provider
            value={{
                societys: state.societys,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </SocietyContext.Provider>
    );
}