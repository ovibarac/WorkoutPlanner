const NewWorkoutView = (props)=>{
    return(
        <div>
            <input
                id="newWorkoutNameInput"
                placeholder="name"
                value={props.newName}
                onChange={props.handleChangeAddName}
            />
            <input
                id="newWorkoutDescInput"
                placeholder="description"
                value={props.newDesc}
                onChange={props.handleChangeAddDesc}
            />
            <button
                id="addWorkoutButton"
                onClick={props.handleAddWorkout}>
                Add
            </button>
        </div>
    )
}

export default NewWorkoutView;