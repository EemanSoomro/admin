import { createContext, useReducer } from "react";
import AnnouncementReducer from "./AnnouncementReducer";

const INITIAL_STATE = {
  announcements: [],
  isFetching: false,
  error: false,
};

export const AnnouncementContext = createContext(INITIAL_STATE);

export const AnnouncementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AnnouncementReducer, INITIAL_STATE);

  return (
    <AnnouncementContext.Provider
      value={{
        announcements: state.announcements,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};
