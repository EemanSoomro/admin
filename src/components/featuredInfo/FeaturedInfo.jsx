import "./featuredInfo.css";
import { useEffect, useState } from "react";

export default function FeaturedInfo() {
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API; // Environment variable

    const getCourses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/courses`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
          },
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();

    const getUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    const getTeachers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/facultys`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
          },
        });
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredContentContainer">
          <span className="featuredContent">{users.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Teachers</span>
        <div className="featuredContentContainer">
          <span className="featuredContent">{teachers.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Courses</span>
        <div className="featuredContentContainer">
          <span className="featuredContent">{courses.length}</span>
        </div>
      </div>
    </div>
  );
}
