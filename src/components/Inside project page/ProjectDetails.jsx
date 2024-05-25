import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "../../modules/firebaseConfig";

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
                    <h2 className="headertext">Scrum Board: {project.name} </h2>
                    </div>
                    <div className="addAssignmentDiv">
                        <input
                            type="text"
                            value={newAssignment.assignment}
                            onChange={(event) =>
                                setNewAssignment({
                                    ...newAssignment,
                                    assignment: event.target.value,
                                })
                            }
                            placeholder="Enter new asignment"
                            required
                        />
                        <select
                            value={newAssignment.category}
                            onChange={(event) =>
                                setNewAssignment({
                                    ...newAssignment,
                                    category: event.target.value,
                                })
                            }
                        >
                            <option value="dev backend">Dev Backend</option>
                            <option value="dev frontend">Dev Frontend</option>
                            <option value="ux">UX</option>
                        </select>
                        <button onClick={handleAddAssignment}>
                            Add Assignment
                        </button>
                    </div>
                    <div className="scrum-board">
                        {["to-do", "in progress", "done"].map((status) => (
                            <div key={status} className="column">
                                <h3>{status}</h3>
                                {Object.keys(assignments)
                                    .filter(
                                        (assignmentId) =>
                                            assignments[assignmentId].status ===
                                            status
                                    )
                                    .map((assignmentId) => (
                                        <div
                                            key={assignmentId}
                                            className="assignment-card"
                                        >
                                            <p>
                                                {
                                                    assignments[assignmentId]
                                                        .assignment
                                                }
                                            </p>
                                            <p>
                                                {
                                                    assignments[assignmentId]
                                                        .assigned
                                                }
                                            </p>
                                            {status !== "done" && (
                                                <button
                                                    onClick={() =>
                                                        updateAssignmentStatus(
                                                            assignmentId,
                                                            status === "to-do"
                                                                ? "in progress"
                                                                : "done"
                                                        )
                                                    }
                                                >
                                                    {status === "to-do"
                                                        ? "Start"
                                                        : "Done"}
                                                </button>
                                            )}
                                            {status === "done" && (
                                                <button
                                                    onClick={() =>
                                                        removeAssignment(
                                                            assignmentId
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            )}
                                            {status === "to-do" && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Assign to"
                                                        onBlur={(event) => {
                                                            const assignmentRef =
                                                                ref(
                                                                    db,
                                                                    `projects/${projectId}/assignment/${assignmentId}`
                                                                );
                                                            set(assignmentRef, {
                                                                ...assignments[
                                                                    assignmentId
                                                                ],
                                                                assigned:
                                                                    event.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProjectDetails;
