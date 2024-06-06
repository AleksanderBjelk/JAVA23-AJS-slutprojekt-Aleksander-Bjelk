//Skapar element för att användaren ska kunna lägga till ett nytt projekt. 

function AddProjectDiv({ handleAddProject }) {
    let newProjectName = ""; 

    const handleInputChange = (event) => {
        newProjectName = event.target.value; 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddProject(newProjectName); 
        event.target.reset(); 
    };

    return (
        <div>
            <form className="addProjectForm" onSubmit={handleSubmit}>
                <input
                    id="searchField"
                    type="text"
                    onChange={handleInputChange} 
                    placeholder="Write a name for your new project"
                    required
                />
                <button id="addProjectBtn" type="submit">
                    Add project
                </button>
            </form>
        </div>
    );
}

export default AddProjectDiv;