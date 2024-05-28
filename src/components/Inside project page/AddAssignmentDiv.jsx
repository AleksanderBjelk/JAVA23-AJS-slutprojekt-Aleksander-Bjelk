//Skapar element för att användaren ska kunna skapa assignment och kunna välja vilken kategori dem vill lägga det i

function AddAssignmentDiv({
    newAssignment,
    handleAddAssignment,
    setNewAssignment,
}) {
    return (
        <div className="addAssignmentDiv">
            <input
                className="projectDetailsInput"
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
                className="projectDetailsBtn"
                value={newAssignment.category}
                onChange={(event) =>
                    setNewAssignment({
                        ...newAssignment,
                        category: event.target.value,
                    })
                }
            >
                <option value="dev-backend">Dev Backend</option>
                <option value="dev-frontend">Dev Frontend</option>
                <option value="ux">UX</option>
            </select>

            <button onClick={handleAddAssignment} className="projectDetailsBtn">
                Add Assignment
            </button>
            
        </div>
    );
}

export default AddAssignmentDiv;
