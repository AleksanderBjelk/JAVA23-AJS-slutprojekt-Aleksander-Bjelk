//samlingsplats för startsidan med alla projekt, hanterar även logiken för att skapa och ta bort projekt

import { onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { projectsRef, db } from "../../utils/firebaseConfig";
import ProjectsDiv from "./ProjectsDiv";
import AddProjectDiv from "./AddProjectForm";

function Home() {
    const [projects, setProjects] = useState({});

    useEffect(() => {
        onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            try {
                setProjects(data || {});
            } catch (error) {
                console.error("error: ", error);
                alert("Något gick fel :( Var snäll och försök senare!");
            }
        });
    }, []);


    const handleAddProject = (newProjectName) => {
        const newProjectRef = push(projectsRef);
        try {
            set(newProjectRef, {
                name: newProjectName,
                assignment: {},
            });
        } catch (error) {
            console.error("error: ", error);
            alert("Något gick fel :( Var snäll och försök senare!");
        }
    };


    const handleRemoveProject = (projectId) => {
        const projectRef = ref(db, `projects/${projectId}`);
        try {
            remove(projectRef);
        } catch (error) {
            console.error("error: ", error);
            alert("Något gick fel :( Var snäll och försök senare!");
        }
    };


    const projectIds = Object.keys(projects);

    console.log(projectIds);

    return (
        <div>
            <header className="header">
                <h1 className="headertext">Projects</h1>
                <h3 className="headertext">Scrum board</h3>
            </header>

            <AddProjectDiv handleAddProject={handleAddProject} />

            <main>
                <ProjectsDiv
                    projects={projects}
                    handleRemoveProject={handleRemoveProject}
                />
            </main>
        </div>
    );
}

export default Home;
