//Här sker även logik för att lägga till assignment, uppdatera statusen, och ta bort ett assignment.
//här hämtar vi även ScrumBoard komponenten och AddAssignmentDiv

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "../../utils/firebaseConfig";
import AddAssignmentDiv from "./AddAssignmentDiv";
import ScrumBoard from "./ScrumBoard";

function ProjectDetails() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [assignments, setAssignments] = useState({});
    const [newAssignment, setNewAssignment] = useState({
        assignment: "",
        category: "dev-backend",
    });

    useEffect(() => {
        const projectRef = ref(db, `projects/${projectId}`);

        onValue(projectRef, (snapshot) => {
            const data = snapshot.val();
            setProject(data);
        });

        const assignmentsRef = ref(db, `projects/${projectId}/assignment`);

        onValue(assignmentsRef, (snapshot) => {
            const data = snapshot.val();
            setAssignments(data || {});
        });
    }, [projectId]);

    const handleAddAssignment = () => {
        if (!newAssignment.assignment.trim()) {
            alert("Du behöver skriva in ett namn för uppgiften!");
            return;
        }
        const assignmentsRef = ref(db, `projects/${projectId}/assignment`);
        const newAssignmentRef = push(assignmentsRef);

        try {
            set(newAssignmentRef, {
                ...newAssignment,
                status: "to-do",
                assigned: "",
            });

            setNewAssignment({ assignment: "", category: "dev-backend" });
        } catch (error) {
            console.error("error: ", error);
            alert("Något gick fel :( Var snäll och försök senare!");
        }
    };

    const updateAssignmentStatus = (assignmentId, status) => {
        const assignmentRef = ref(
            db,
            `projects/${projectId}/assignment/${assignmentId}`
        );

        try {
            set(assignmentRef, {
                ...assignments[assignmentId],
                status: status,
            });
        } catch (error) {
            console.error("error: ", error);
            alert("Något gick fel :( Var snäll och försök senare!");
        }
    };

    const removeAssignment = (assignmentId) => {
        const assignmentRef = ref(
            db,
            `projects/${projectId}/assignment/${assignmentId}`
        );

        try {
            remove(assignmentRef);
        } catch (error) {
            console.error("error: ", error);
            alert("Något gick fel :( Var snäll och försök senare!");
        }
    };

    return (
        <div>
            {project ? (
                <div>
                    <div className="header">
                        <h2 className="headertext">
                            Scrum Board: {project.name}
                        </h2>
                        <Link className="goBackLink" to={`/`}>
                            <h2>Gå tillbaka till startsidan</h2>
                        </Link>
                    </div>

                    <AddAssignmentDiv
                        newAssignment={newAssignment}
                        setNewAssignment={setNewAssignment}
                        handleAddAssignment={handleAddAssignment}
                    />

                    <div className="categoryColorDiv">
                        <h1 id="devBackendColor">Dev backend</h1>
                        <h1 id="devFrontendColor">Dev frontend</h1>
                        <h1 id="uxColor">ux</h1>
                    </div>

                    <ScrumBoard
                        projectId={projectId}
                        assignments={assignments}
                        updateAssignmentStatus={updateAssignmentStatus}
                        removeAssignment={removeAssignment}
                    />
                </div>
            ) : (
                <p>Loading... please check your connection!</p>
            )}
        </div>
    );
}

export default ProjectDetails;
