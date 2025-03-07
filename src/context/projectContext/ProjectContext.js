import { createContext, useReducer } from "react";
import ProjectReducer from "./ProjectReducer";

const INITIAL_STATE = {
  projects: [],
  isFetching: false,
  error: false,
};

export const ProjectContext = createContext(INITIAL_STATE);

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProjectReducer, INITIAL_STATE);

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
