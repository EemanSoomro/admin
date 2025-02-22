import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { CourseContextProvider } from "./context/courseContext/CourseContext";
import { DepartmentContextProvider } from "./context/departmentContext/DepartmentContext";
import { TeacherContextProvider } from "./context/teacherContext/TeacherContext";
import { MaterialContextProvider } from "./context/materialContext/MaterialContext";
import { SocietyContextProvider } from "./context/societyContext/SocietyContext";
import { EventContextProvider } from "./context/eventContext/EventContext";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CourseContextProvider>
          <DepartmentContextProvider>
            <TeacherContextProvider>
              <MaterialContextProvider>
                <SocietyContextProvider>
                  <EventContextProvider>
                    <App />
                  </EventContextProvider>
                </SocietyContextProvider>
              </MaterialContextProvider>
            </TeacherContextProvider>
          </DepartmentContextProvider>
        </CourseContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
