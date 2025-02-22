import EventReducer from './EventReducer';
import { createContext, useReducer } from "react";
const INITIAL_STATE = {
    events: [],
    isFetching: false,
    error: false,
};

export const EventContext = createContext(INITIAL_STATE);

export const EventContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EventReducer, INITIAL_STATE);
    
    return (
        <EventContext.Provider
            value={{
                events: state.events,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}