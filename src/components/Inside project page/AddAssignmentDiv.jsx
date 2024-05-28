//Skapar element för att användaren ska kunna skapa assignment och kunna välja vilken kategori dem vill lägga det i

function AddAssignmentDiv({
    newAssignment,
    handleAddAssignment,
    setNewAssignment,
}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddAssignment();
    };

    return (
        <div className="addAssignmentDiv">
            <form onSubmit={handleSubmit}>
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

                <button type="submit" className="projectDetailsBtn">
                    Add Assignment
                </button>
            </form>
        </div>
    );
}

export default AddAssignmentDiv;
