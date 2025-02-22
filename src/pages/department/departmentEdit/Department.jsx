import "./department.css";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { updateDepartment } from "../../../context/departmentContext/apiCalls";
import { useContext, useState } from "react";
import { DepartmentContext } from "../../../context/departmentContext/DepartmentContext";
import swal from 'sweetalert';
import storage from "../../../firebase/firebase";
import { useHistory } from "react-router-dom";

export default function Department() {
  // Update Department
  const History = useHistory();
  const { dispatch } = useContext(DepartmentContext);
  const location = useLocation();
  const department = location.department;
  const [inputs, setInputs] = useState(null);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [backgroundpicture, setbackgroundimage] = useState(null);
  const [studyPlan, setPlan] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    updateDepartment(department._id, inputs, dispatch);
    History.push("/");
  };

  const upload = (items) => {
    if (items === null) return;
    items.forEach((item) => {
      if (item.file === null) {
        setUploaded(uploaded + 1);
        // Go to the next item without returning
      }
      else {
        const FileName = Date.now() + item.label + department.name;
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
              setUploaded(uploaded + 1);
              setInputs((prev) => ({ ...prev, [item.label]: url }));
            });
          }
        );
      }
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: file, label: "picture" },
      {
        file: studyPlan, label: "studyplan",
      },
      {
        file: backgroundpicture, label: "backgroundpicture",
      }
    ]);
  };

  console.log(department)
  console.log(inputs)

  return (
    <div className="department">
      <div className="departmentTitleContainer">
        <h1 className="departmentTitle">Department</h1>
      </div>
      <div className="departmentTop">
        <div className="departmentTopRight">
          <div className="departmentInfoTop">
            <img src={department.picture} alt="" className="departmentInfoImg" />
            <span className="departmentName">{department.name}</span>
          </div>
          <div className="departmentInfoBottom">
            <div className="departmentInfoItem">
              <span className="departmentInfoKey">id:</span>
              <span className="departmentInfoValue">{department._id}</span>
            </div>
            <div className="departmentInfoItem">
              <span className="departmentInfoKey">Code:</span>
              <span className="departmentInfoValue">{department.code}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="departmentBottom">
        <form className="departmentForm">
          <div className="departmentFormLeft">
            <label>Department Name</label>
            <input type="text" placeholder={department.name} name="name" onChange={handleChange} />
            <label>Code</label>
            <select name="code" id="code" onChange={handleChange}>
              <option value={department.code}>{department.code}</option>
              <option value={department.code}>{department.code}</option>
            </select>
            <label>About</label>
            <textarea type="text" placeholder={department.about} name="about" onChange={handleChange} />
          </div>
          <div className="departmentFormRight">
            <div className="departmentUpload">
              <img src={department.picture} alt="" className="departmentUploadImg" />
              <label for="picture">
                <Publish />
              </label>
              <input type="file" id="picture" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="departmentUpload">
              <h4>Study Plan</h4>
              <label for="departmentOutline">
                <Publish />
              </label>
              <input type="file" id="departmentOutline" style={{ display: "none" }} onChange={(e) => setPlan(e.target.files[0])} />
            </div>
            <div className="departmentUpload">
              <img src={department.backgroundpicture} alt="" className="departmentUploadImg" />
              <label for="backgroundpicture">
                <Publish />
              </label>
              <input type="file" id="backgroundpicture" style={{ display: "none" }} onChange={(e) => setbackgroundimage(e.target.files[0])} />
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
          </div>
        </form>
      </div>
    </div>
  );
}
