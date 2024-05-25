import { Link } from "react-router-dom";

function ProjectsDiv({ projects, onRemoveProject }) {
  console.log("Projects:", projects); 

  return (
    <div className="cardDiv">

      {Object.keys(projects).length > 0 ? (

          Object.keys(projects).map((projectId) => (

              <div key={projectId} className="project-card">


                <button id="removeProjectBtn" onClick={() => onRemoveProject(projectId)}>X</button>
                <Link to={`/project/${projectId}`}>
                  <h2>{projects[projectId].name}</h2>
                </Link>
              </div>
          ))
      ) : (

        <p>No projects available</p>

      )}

    </div>
  );
}

export default ProjectsDiv;
