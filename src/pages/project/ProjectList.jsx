import "./projectList.css";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../context/projectContext/ProjectContext";
import { fetchProjects } from "../../context/projectContext/apiCalls";

const ProjectList = () => {
  const { projects, dispatch } = useContext(ProjectContext);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

  useEffect(() => {
    fetchProjects(dispatch);
  }, [dispatch]);

  console.log("Projects from Context:", projects);

  const projectArray = Array.isArray(projects.data) ? projects.data : [];
  console.log("Final Projects Array:", projectArray);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectArray.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="projectList">
      <table className="projectTable">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Type</th>
            <th>Project Domain</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.type}</td>
                <td>{project.domain}</td>
                <td className="projectListActions">
                  <button className="projectListEdit">Edit</button>
                  <span className="projectListDelete">🗑</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No projects found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>Page {currentPage}</span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={indexOfLastProject >= projectArray.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
