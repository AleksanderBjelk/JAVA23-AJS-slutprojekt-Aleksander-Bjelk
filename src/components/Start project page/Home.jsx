import { onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { projectsRef } from "../../modules/firebaseConfig";
import ProjectsDiv from "./ProjectsDiv";
import AddProject from "./AddProject";

function Home() {
    const [projects, setProjects] = useState({});

    useEffect(() => {
        onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            setProjects(data);
        });
    }, []);

    const handleAddProject = (newProjectName) => {
        const newProjectRef = push(projectsRef);
        set(newProjectRef, {
            name: newProjectName,
            assignment: {}
        });
    };


    const projectIds = Object.keys(projects);

    console.log(projectIds);

    return (
        <div>
            <header className="header">
                <h1 className="headertext">Projects</h1>
                <h3 className="headertext">Scrum board</h3>
            </header>
            
            <AddProject onAddProject={handleAddProject} />
            
            <main>
                <ProjectsDiv projects={projects} />
            </main>
        </div>
    );
}

export default Home;