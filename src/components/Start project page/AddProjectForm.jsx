//Skapar element för att användaren ska kunna lägga till ett nytt projekt. 

import { useRef } from "react";

function AddProjectDiv({ handleAddProject }) {
    const newProjectNameRef = useRef("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddProject(newProjectNameRef.current.value);
        newProjectNameRef.current.value = "";
    };

    return (
        <div>
            <form className="addProjectForm" onSubmit={handleSubmit}>
            <input
                    id="searchField"
                    type="text"
                    ref={newProjectNameRef}
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
