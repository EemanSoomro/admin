import "./newCourse.css";
import { useState } from "react";
import storage from "../../../firebase/firebase";
import { createCourse } from "../../../context/courseContext/apiCalls";
import { CourseContext } from "../../../context/courseContext/CourseContext";
import { useContext } from "react";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
// Import Navigate from react-router-dom
export default function NewCourse() {
  const History = useHistory();
  const { dispatch } = useContext(CourseContext);
  const [uploaded, setUploaded] = useState(0);
  const [inputs, setInputs] = useState(null);
  const [file, setFile] = useState(null);
  const [courseOutline , setOutline] = useState(null);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    createCourse(inputs, dispatch);  
    resetInputFields();
    History.push("/");

  };

  const resetInputFields = () => {
    setInputs(null);
    setFile(null);
    setOutline(null);
    setUploaded(0);
  };


  const upload = (items) => {
    
    if (items === null) return;
    items.forEach((item) => {
      const FileName = Date.now() +item.label;
      const uploadTask = storage.ref(`/Courses/${FileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            swal({
              title: "Uploading File",
              // Round off progress to 2 decimal places
              text: Math.round(progress) + "%",
              icon: "success",
              button: false,
              timer: 1800
            })   
            console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setInputs((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {
        file: file, label: "courseImage",
      },
      {
        file: courseOutline, label: "courseOutline",
      }
    ]);
  };
  console.log(inputs);



  return (
    <div className="newCourse">
      <h1 className="addCourseTitle">New Course</h1>
      <form className="addCourseForm">
        <div className="addCourseItem">
          <label>Course Image</label>
          <input type="file" id="courseImage" name="courseImage" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addCourseItem">
          <label>Course Outline</label>
          <input type="file" id="courseOutline" name="courseOutline" onChange={(e) => setOutline(e.target.files[0])} />
        </div>
        <div className="addCourseItem">
          <label>Course Code</label>
          <input type="text" placeholder="CS2008" id="coursecode" name="coursecode" onChange={handleChange} />
        </div>
        <div className="addCourseItem">
          <label>Name</label>
          <input type="text" placeholder="Operating Systems" id="name" name="name" onChange={handleChange} />
        </div>
        <div className="addCourseItem">
          <label>Description</label>
          {/* TeaxtArea */}
          <textarea placeholder="" rows="2" id="description" name="description" onChange={handleChange} />
        </div>
        <div className="addCourseItem">
          <label>Credit Hours</label>
          <input type="number" placeholder="0" id="credithours" name="credithours" onChange={handleChange} />
        </div>
        <div className="addCourseItem">
          <label>Core / Elective</label>
          <select name="core_elective" id="core_elective" onChange={handleChange}>
            <option value="Core">Select</option>
            <option value="Core">Core</option>
            <option value="Elective">Elective</option>
          </select>
        </div>
        {uploaded === 2 ? (
          <button className="addCourseButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addCourseButton" onClick={handleUpload}>
            Upload
          </button>
        )}

      </form>
    </div>
  );
}
