import "./projectNew.css";
import { useState, useContext } from "react";
import axios from "axios";
import { createProject } from "../../context/projectContext/apiCalls";
import { ProjectContext } from "../../context/projectContext/ProjectContext";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default function ProjectNew() {
  const history = useHistory();
  const { dispatch } = useContext(ProjectContext);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Submit (File Upload + Project Save Together)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if file is selected
    if (!file) {
      swal("No file selected", "Please select an image file", "error");
      return;
    }

    // Upload image file first
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8800/api/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url } = res.data; // Image URL after successful upload

      // Now create project with uploaded image URL
      const projectData = { ...inputs, picture: url };
      await createProject(projectData, dispatch);

      swal("Success!", "Project added successfully!", "success");
      history.push("/");

    } catch (error) {
      console.error("❌ Error:", error);
      swal("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="projectNew">
      <h1 className="addProjectTitle">New Project</h1>
      <form className="addProjectForm" onSubmit={handleSubmit}>
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
          <option value="Completed">Completed</option>
          <option value="Planned">Planned</option>
          <option value="Canceled">Canceled</option>
        </select>

        <label>Image</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button className="addProjectButton" type="submit">Create</button>
      </form>
    </div>
  );
}
