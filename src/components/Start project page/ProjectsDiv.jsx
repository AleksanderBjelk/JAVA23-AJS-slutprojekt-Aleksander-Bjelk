//hanterar projekt-elementen och ger dem en (ljus)slumpmässigfärg och en knapp för att ta bort projekt

import { Link } from "react-router-dom";

function ProjectsDiv({ projects, handleRemoveProject }) {
  console.log("Projects:", projects); 

  const lightColors = [ //chat gpt genererat
    "#FFCCCB", "#FFA07A", "#FFD700", "#FFB6C1", "#FF6347", "#FF69B4", "#FFC0CB", 
    "#FFDAB9", "#FFE4E1", "#FFF0F5", "#FFF8DC", "#FFFACD", "#FFFAF0", "#FFFAFA", 
    "#FF4500", "#FF7F50", "#FF8C00", "#FFA500", "#FFDAB9", "#FFDEAD", "#FFE4B5", 
    "#FFE4C4", "#FFE4E1", "#FFEBCD", "#FFEFD5", "#FFF0F5", "#FFF5EE", "#FFF8DC", 
    "#FFFACD", "#FFFAF0"
  ];

   const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * lightColors.length);
    return lightColors[randomIndex];
  };

  return (
    <div className="cardDiv" >

      {Object.keys(projects).length > 0 ? (

          Object.keys(projects).map((projectId) => (
            
              //kolla med clara om det är ok med style
              <div key={projectId} className="project-card" style={{backgroundColor: getRandomColor()}}> 

                <button id="removeProjectBtn" onClick={() => handleRemoveProject(projectId)}>X</button>
                <Link to={`/project/${projectId}`} >
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
