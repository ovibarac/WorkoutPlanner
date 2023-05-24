const NewExerciseView = (props)=>{
    return(
        <div>
            <input
                id="newExerciseNameInput"
                placeholder="name"
                value={props.newName}
                onChange={props.handleChangeAddName}
            />
            <input
                id="newExerciseDescInput"
                placeholder="description"
                value={props.newDescription}
                onChange={props.handleChangeAddDesc}
            />
            <button
                id="addExerciseButton"
                onClick={props.handleAddExercise}>
                Add
            </button>
        </div>
    )
}

export default NewExerciseView;