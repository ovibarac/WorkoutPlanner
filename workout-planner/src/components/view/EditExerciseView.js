const EditExerciseView = (props) => {
    return(
        <>
            {props.isOpenEditExercise &&
                <div id="editExercise">
                    <div id="innerEditExercise">
                        <input
                            placeholder="new name"
                            value={props.editName}
                            onChange={props.handleChangeEditName}
                        />
                        <input
                            placeholder="new description"
                            value={props.editDesc}
                            onChange={props.handleChangeEditDesc}
                        />
                        <button
                            onClick={() => props.handleUpdateExercise(exercise)}
                        >
                            Edit
                        </button>
                    </div>

                </div>
            }
        </>
    )
}

export default EditExerciseView;