//hanterar inmatningen från användaren vid skapandet av ett nytt projekt

import { useState } from "react";

function AddProjectDiv({ handleAddProject }) {
    const [newProjectName, setNewProjectName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddProject(newProjectName);
        setNewProjectName("");
    };

    return (
        <div>
            <form className="addProjectForm" onSubmit={handleSubmit}>
                <input
                    id="searchField"
                    type="text"
                    value={newProjectName}
                    onChange={(event) => setNewProjectName(event.target.value)}
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
