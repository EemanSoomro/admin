import "./newDepartment.css";
import { useState } from "react";
import storage from "../../../firebase/firebase";
import { createDepartment } from "../../../context/departmentContext/apiCalls";
import { DepartmentContext } from "../../../context/departmentContext/DepartmentContext";
import { useContext } from "react";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
// Import Navigate from react-router-dom
export default function NewDepartment() {
  const History = useHistory();
  const { dispatch } = useContext(DepartmentContext);
  const [uploaded, setUploaded] = useState(0);
  const [inputs, setInputs] = useState(null);
  const [file, setFile] = useState(null);
  const [departmentstudyplan, setstudyplan] = useState(null);
  const [backgroundpicture, setbackgroundimage] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    createDepartment(inputs, dispatch);
    resetInputFields();
    History.push("/");

  };

  const resetInputFields = () => {
    setInputs(null);
    setFile(null);
    setstudyplan(null);
    setUploaded(0);
  };


  const upload = (items) => {
    if (items === null) return;
    items.forEach((item) => {
      if (item.file === null) {
        setUploaded(uploaded + 1);
        // Go to the next item without returning
      }
      else {
      const FileName = Date.now() + item.label + (item.file ? item.file.name : "");
      const uploadTask = storage.ref(`/Departments/${FileName}`).put(item.file);
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
      }
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {
        file: file, label: "picture",
      },
      {
        file: departmentstudyplan, label: "studyplan",
      },
      {
        file: backgroundpicture, label: "backgroundpicture",
      }
    ]);
  };
  console.log(inputs);



  return (
    <div className="newDepartment">
      <h1 className="addDepartmentTitle">New Department</h1>
      <form className="addDepartmentForm">
        <div className="addDepartmentItem">
          <label>Image</label>
          <input type="file" id="picture" name="picture" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addDepartmentItem">
          <label>Study Plan</label>
          <input type="file" id="studyplan" name="studyplan" onChange={(e) => setstudyplan(e.target.files[0])} />
        </div>
        <div className="addDepartmentItem">
          <label>Image</label>
          <input type="file" id="backgroundpicture" name="backgroundpicture" onChange={(e) => setbackgroundimage(e.target.files[0])} />
        </div>
        <div className="addDepartmentItem">
          <label>Code</label>
          <input type="text" placeholder="SE" id="code" name="code" onChange={handleChange} />
        </div>
        <div className="addDepartmentItem">
          <label>Name</label>
          <input type="text" placeholder="Software Engineering" id="name" name="name" onChange={handleChange} />
        </div>
        <div className="addDepartmentItem">
          <label>Description</label>
          {/* TeaxtArea */}
          <textarea placeholder="" rows="2" id="about" name="about" onChange={handleChange} />
        </div>
        {uploaded > 2 ? (
          <button className="addDepartmentButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addDepartmentButton" onClick={handleUpload}>
            Upload
          </button>
        )}

      </form>
    </div>
  );
}
