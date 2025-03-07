import "./projectEdit.css";
import { Publish } from "@material-ui/icons";
import { useParams, useHistory } from "react-router-dom";
import { updateProject } from "../../context/projectContext/apiCalls";
import { useContext, useState } from "react";
import { ProjectContext } from "../../context/projectContext/ProjectContext";
import storage from "../../firebase/firebase";

export default function ProjectEdit() {
  const history = useHistory();
  const { projects, dispatch } = useContext(ProjectContext);
  const { projectId } = useParams(); // Fetching project ID from URL

  // Find the project in the global state
  const project = projects.find((p) => p._id === projectId);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project) {
      updateProject(project._id, inputs, dispatch);
      history.push("/projects"); // Redirect to project list
    }
  };

  if (!project) {
    return (
      <div className="projectEdit">
        <h1 className="projectEditTitle">Project Not Found</h1>
        <p style={{ color: "red" }}>The requested project does not exist or may have been removed.</p>
        <button onClick={() => history.push("/projects")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="projectEdit">
      <h1 className="projectEditTitle">Edit Project</h1>
      <form className="projectEditForm">
        <div className="projectEditLeft">
          <label>Project Name</label>
          <input type="text" placeholder={project.name} name="name" onChange={handleChange} />
          <label>Description</label>
          <textarea placeholder={project.description} name="description" onChange={handleChange} />
        </div>
        <div className="projectEditRight">
          <div className="projectUpload">
            <img src={project.image} alt="" className="projectUploadImg" />
            <label htmlFor="file"><Publish /></label>
            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button className="projectButton" onClick={handleSubmit}>Update</button>
        </div>
      </form>
    </div>
  );
}
