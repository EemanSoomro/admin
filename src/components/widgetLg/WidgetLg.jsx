import "./widgetLg.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function WidgetLg(user) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await fetch("/courses?new=true", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">New Course</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Course</th>
            <th className="widgetLgTh">Core/Elective</th>
            <th className="widgetLgTh">Credit Hours</th>
          </tr>
          {courses.map((course) => (
            <tr className="widgetLgTr" key={course._id}>
              <td className="widgetLgUser">
                <Link to={{ pathname: "/course/" + course._id, course: course }}>
                  <img
                    src={course.courseImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"}
                    alt=""
                    className="widgetLgImg"
                  />
                </Link>
                <span className="widgetLgName">{course.name}</span>
              </td>
              <td className="widgetLgDate">{course.core_elective}</td>
              <td className="widgetLgAmount">{course.credithours}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
