import { ref, set} from "firebase/database";
import { db } from "../../modules/firebaseConfig";

function ScrumBoard({ assignments, updateAssignmentStatus, removeAssignment }) {
    return (
        <div className="scrum-board">
            {["to-do", "in progress", "done"].map((status) => (

                <div key={status} className="column">
                    <h3>{status}</h3>

                    {Object.keys(assignments)
                        .filter((assignmentId) =>assignments[assignmentId].status === status)
                        .map((assignmentId) => (

                            <div key={assignmentId} className="assignment-card">
                                <p>{assignments[assignmentId].assignment}</p>
                                <p>{assignments[assignmentId].assigned}</p>

                                {status !== "done" && (
                                    <button onClick={() => updateAssignmentStatus( assignmentId, status === "to-do" ? "in progress" : "done")}>
                                        {status === "to-do" ? "Start" : "Done"}
                                    </button>
                                )}

                                {status === "done" && (
                                    <button onClick={() => removeAssignment(assignmentId)}>Remove</button>
                                )}

                                {status === "to-do" && (
                                    <div>
                                        <input type="text" placeholder="Assign to" onBlur={(event) => { //spara användarens ändringar i "Assign to"
                                                const assignmentRef = ref( db, `projects/${projectId}/assignment/${assignmentId}`);
                                                set(assignmentRef, {
                                                    ...assignments[
                                                        assignmentId
                                                    ], assigned: event.target.value,
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
    );
}

export default ScrumBoard;

// referenser:
// https://www.geeksforgeeks.org/react-onblur-event/
// https://www.w3schools.com/jsref/event_onblur.asp
