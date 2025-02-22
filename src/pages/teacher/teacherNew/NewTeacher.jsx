import "./newTeacher.css";
import { useState } from "react";
import storage from "../../../firebase/firebase";
import { createTeacher } from "../../../context/teacherContext/apiCalls";
import { TeacherContext } from "../../../context/teacherContext/TeacherContext";
import { useContext } from "react";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

export default function NewTeacher() {
  const History = useHistory();
  const { dispatch } = useContext(TeacherContext);
  const [uploaded, setUploaded] = useState(0);
  const [inputs, setInputs] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    createTeacher(inputs, dispatch);
    resetInputFields();
    History.push("/");

  };

  const resetInputFields = () => {
    setInputs(null);
    setFile(null);
    setUploaded(0);
  };


  const upload = (items) => {
    
    if (items === null) return;
    items.forEach((item) => {
      const FileName = Date.now() +item.label + item.file.name;
      const uploadTask = storage.ref(`/Teachers/${FileName}`).put(item.file);
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
        file: file, label: "picture",
      }
    ]);
  };
  console.log(inputs);


  return (
    <div className="newTeacher">
      <h1 className="addTeacherTitle">New Teacher</h1>
      <form className="addTeacherForm">
        <div className="addTeacherItem">
          <label>Course Image</label>
          <input type="file" id="picture" name="picture" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addTeacherItem">
          <label>Name</label>
          <input type="text" placeholder="Dr. Abdul Aziz" id="name" name="name" onChange={handleChange} />
        </div>
        <div className="addTeacherItem">
          <label>Email</label>
          <input type="email" placeholder="abdul.aziz@nu.edu.pk" id="email" name="email" onChange={handleChange} />
        </div>
        <div className="addTeacherItem">
          <label>Department</label>
          {/* Display All Courses Name in A select */}
          <select name="department" id="department" onChange={handleChange}>
            <option value="CS">Select Department</option>
            <option value="CS">Computer Science</option>
            <option value="EE">Electrical Engineering</option>
            <option value="SE">Software Engineering</option>
            <option value="AI">Atificial Intelligence</option>
            <option value="SH">Science and Humanities</option>
            <option value="CYS">Cyber Security</option>
            <option value="BBA">Busiiness Administration</option>
            <option value="RB">Robotics</option>
          </select>
        </div>
        <div className="addTeacherItem">
          <label>About</label>
          {/* TeaxtArea */}
          <textarea placeholder="" rows="2" id="about" name="about" onChange={handleChange} />
        </div>
        {uploaded === 1 ? (
          <button className="addCourseButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addCourseButton" onClick={handleUpload}>
            Upload
          </button>
        )}      </form>
    </div>
  );
}
