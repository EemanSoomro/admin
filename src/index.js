import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { DepartmentContextProvider } from "./context/departmentContext/DepartmentContext";
import { TeacherContextProvider } from "./context/teacherContext/TeacherContext";
import { MaterialContextProvider } from "./context/materialContext/MaterialContext";
import { SocietyContextProvider } from "./context/societyContext/SocietyContext";
import { EventContextProvider } from "./context/eventContext/EventContext";
import { AnnouncementContextProvider } from "./context/announcementContext/AnnouncementContext";
import { ProjectContextProvider } from "./context/projectContext/ProjectContext";  // ✅ Project Context Added
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AnnouncementContextProvider>
          <DepartmentContextProvider>
            <TeacherContextProvider>
              <MaterialContextProvider>
                <SocietyContextProvider>
                  <EventContextProvider>
                    <ProjectContextProvider> {/* ✅ Project Context Wrap Added */}
                      <App />
                    </ProjectContextProvider>
                  </EventContextProvider>
                </SocietyContextProvider>
              </MaterialContextProvider>
            </TeacherContextProvider>
          </DepartmentContextProvider>
        </AnnouncementContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
