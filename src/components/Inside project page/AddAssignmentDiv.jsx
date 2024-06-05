//Skapar element för att användaren ska kunna skapa assignment och kunna välja vilken kategori dem vill lägga det i

import { useRef } from "react";

function AddAssignmentDiv({ handleAddAssignment }) {
    const assignmentRef = useRef("");
    const categoryRef = useRef("dev-backend");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddAssignment({
            assignment: assignmentRef.current.value,
            category: categoryRef.current.value,
        });
        assignmentRef.current.value = "";
        categoryRef.current.value = "dev-backend";
    };

    return (
        <div className="addAssignmentDiv">
            <form onSubmit={handleSubmit}>
                <input
                    className="projectDetailsInput"
                    type="text"
                    ref={assignmentRef}
                    placeholder="Enter new assignment"
                    required
                />
                <select
                    className="projectDetailsBtn"
                    ref={categoryRef}
                    defaultValue="dev-backend"
                >
                    <option value="dev-backend">Dev Backend</option>
                    <option value="dev-frontend">Dev Frontend</option>
                    <option value="ux">UX</option>
                </select>

                <button type="submit" className="projectDetailsBtn">
                    Add Assignment
                </button>
            </form>
        </div>
    );
}

export default AddAssignmentDiv;