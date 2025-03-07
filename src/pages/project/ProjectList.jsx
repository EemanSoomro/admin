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

  // ✅ Calculate indexes for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // ✅ Handle pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);

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

      {/* ✅ Pagination Controls */}
      {projects.length > projectsPerPage && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
