import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "../../modules/firebaseConfig";
import AddAssignmentDiv from "./AddAssignmentDiv";
import ScrumBoard from "./ScrumBoard";

function ProjectDetails() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [assignments, setAssignments] = useState({});
    const [newAssignment, setNewAssignment] = useState({
        assignment: "",
        category: "dev backend",
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
            console.log("Assignments data:", data);
            setAssignments(data || {}); //helt otroligt att det ska ta sån tid att förstå detta
        });
    }, [projectId]);



    const handleAddAssignment = () => {
        const assignmentsRef = ref(db, `projects/${projectId}/assignment`);
        const newAssignmentRef = push(assignmentsRef);

        set(newAssignmentRef, {
            ...newAssignment,
            status: "to-do",
            assigned: "",
        });

        setNewAssignment({ assignment: "", category: "dev backend" }); //sätter den så länge så det inte blir kludd
    };



    const updateAssignmentStatus = (assignmentId, status) => {
        const assignmentRef = ref(
            db,
            `projects/${projectId}/assignment/${assignmentId}`
        );

        set(assignmentRef, {
            ...assignments[assignmentId],
            status: status,
        });
    };



    const removeAssignment = (assignmentId) => {
        const assignmentRef = ref(
            db,
            `projects/${projectId}/assignment/${assignmentId}`
        );

        remove(assignmentRef);
    };

    //5h senare och måste fixa som efter prettier förstörde allt och dela upp i fler komponenter

    return (
        <div>
            {project ? (
                <div>
                    <div className="header">
                        <h2 className="headertext">
                            Scrum Board: {project.name}
                        </h2>
                    </div>

                    <AddAssignmentDiv
                        newAssignment={newAssignment}
                        setNewAssignment={setNewAssignment}
                        handleAddAssignment={handleAddAssignment}
                    />

                    <ScrumBoard
                        assignments={assignments}
                        updateAssignmentStatus={updateAssignmentStatus}
                        removeAssignment={removeAssignment}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProjectDetails;
