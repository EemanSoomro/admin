import "./projectNew.css";
import { useState, useContext } from "react";
import storage from "../../firebase/firebase";
import { createProject } from "../../context/projectContext/apiCalls";
import { ProjectContext } from "../../context/projectContext/ProjectContext";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

export default function ProjectNew() {
  const history = useHistory();
  const { dispatch } = useContext(ProjectContext);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject(inputs, dispatch);
    history.push("/");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const fileName = `${Date.now()}_${file.name}`;
    const uploadTask = storage.ref(`/Projects/${fileName}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        swal({ title: "Uploading File", text: `${Math.round(progress)}%`, icon: "success", button: false, timer: 1800 });
      },
      (error) => console.log(error),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setInputs((prev) => ({ ...prev, picture: url })); // ✅ Make sure 'picture' matches the backend schema
          setUploaded(uploaded + 1);
        });
      }
    );
  };

  return (
    <div className="projectNew">
      <h1 className="addProjectTitle">New Project</h1>
      <form className="addProjectForm">
        <label>Project Name</label>
        <input type="text" placeholder="Enter project name" name="name" onChange={handleChange} />

        <label>Type</label>
        <input type="text" placeholder="Enter project type" name="type" onChange={handleChange} />

        <label>Domain</label>
        <input type="text" placeholder="Enter project domain" name="domain" onChange={handleChange} />

        <label>Abstract</label>
        <textarea placeholder="Enter project abstract" name="abstract" onChange={handleChange} />

        <label>Objective</label>
        <textarea placeholder="Enter project objective" name="objective" onChange={handleChange} />

        <label>Application</label>
        <textarea placeholder="Enter project application" name="application" onChange={handleChange} />

        <label>Technologies</label>
        <input type="text" placeholder="Enter project technologies" name="technologies" onChange={handleChange} />

        <label>Supervisor</label>
        <input type="text" placeholder="Enter supervisor name" name="supervisor" onChange={handleChange} />

        <label>University</label>
        <input type="text" placeholder="Enter university name" name="university" onChange={handleChange} />

        <label>Year</label>
        <input type="number" placeholder="Enter project year" name="year" onChange={handleChange} />

        <label>Status</label>
        <select name="status" onChange={handleChange}>
          <option value="In Progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="planned">Planned</option>
          <option value="canceled">Canceled</option>
        </select>

        <label>Image</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        {uploaded ? (
          <button className="addProjectButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProjectButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}
