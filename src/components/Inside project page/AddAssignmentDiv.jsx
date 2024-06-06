//Skapar element för att användaren ska kunna skapa assignment och kunna välja vilken kategori dem vill lägga det i

function AddAssignmentDiv({ handleAddAssignment }) {
    let assignment = "";
    let category = "dev-backend";

    const handleInputChange = (event) => {
        assignment = event.target.value;
    };

    const handleSelectChange = (event) => {
        category = event.target.value;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddAssignment({
            assignment: assignment,
            category: category,
        });
        event.target.reset(); 
    };

    return (
        <div className="addAssignmentDiv">
            <form onSubmit={handleSubmit}>
                <input
                    className="projectDetailsInput"
                    type="text"
                    onChange={handleInputChange} 
                    placeholder="Enter new assignment"
                    required
                />
                <select
                    className="projectDetailsBtn"
                    onChange={handleSelectChange} 
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