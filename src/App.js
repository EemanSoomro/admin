import { 
  Topbar, Sidebar, Home, UserList, User, NewUser, CourseList, Course, NewCourse, 
  TeacherList, Teacher, NewTeacher, MaterialList, Material, NewMaterial, AuthContext, 
  Department, NewDepartment, DepartmentList, SocietyList, NewSociety, Society, Event, 
  NewEvent, EventList, AnnouncementList,NewAnnouncement 
} from "./pages/AppExportAll";

import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Signup";
import { useEffect, useState, useContext } from "react";
import "./App.css";
import swal from 'sweetalert';

function App() {
  const History = useHistory();
  const { dispatch, user } = useContext(AuthContext);
  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(user?.isAdmin);
    if (!user) {
      History.push("/login");
    } else {
      setAdmin(user.isAdmin);
      if (!user.isAdmin) {
        swal({
          title: "Access Denied",
          text: "You are not authorized to access this page",
          icon: "error",
          button: false,
          timer: 1500,
        });
        dispatch({ type: "LOGOUT" });
      } else {
        History.push("/");
      }
    }
  }, [user, History, dispatch]);

  return (
    <Switch>
      <Route path="/login">{Admin ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">{Admin ? <Redirect to="/" /> : <Register />}</Route>
      
      {user && Admin && (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route exact path="/"><Home user={user} /></Route>
            <Route path="/users"><UserList /></Route>
            <Route path="/user/:userId"><User /></Route>
            <Route path="/newUser"><NewUser /></Route>
            <Route path="/courses"><CourseList /></Route>
            <Route path="/course/:courseId"><Course /></Route>
            <Route path="/newcourse"><NewCourse /></Route>
            <Route path="/teachers"><TeacherList /></Route>
            <Route path="/teacher/:teacherId"><Teacher /></Route>
            <Route path="/newteacher"><NewTeacher /></Route>
            <Route path="/departments"><DepartmentList /></Route>
            <Route path="/department/:departmentId"><Department /></Route>
            <Route path="/newdepartment"><NewDepartment /></Route>
            <Route path="/societies"><SocietyList /></Route>
            <Route path="/society/:societyId"><Society /></Route>
            <Route path="/newsociety"><NewSociety /></Route>
            <Route path="/events"><EventList /></Route>
            <Route path="/event/:eventId"><Event /></Route>
            <Route path="/newevent"><NewEvent /></Route>
            <Route path="/materials"><MaterialList user={user} /></Route>
            <Route path="/material/:materialId"><Material user={user} /></Route>
            <Route path="/newmaterial"><NewMaterial user={user} /></Route>
            
            {/* Announcement Routes */}
            <Route path="/announcements"><AnnouncementList /></Route>
            {/* <Route path="/announcement/:announcementId"><NewAnnouncement /></Route> */}
            <Route path="/newannouncement"><NewAnnouncement /></Route>
          </div>
        </>
      )}
    </Switch>
  );
}

export default App;
