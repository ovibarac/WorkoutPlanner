import {useState} from "react";

const ExerciseListItem = (props) => {
    const [isOpenEditExercise, setIsOpenEditExercise] = useState(false);

    return(
        <div id="wrapperListItem">
            <li key={props.exercise.id}
                className="exerciseListItem">

                <h1>{props.exercise.name}</h1>
                <p>{props.exercise.description}</p>
                <div id="editDeleteContainer">
                    <button
                        className="activeOnHover fa fa-pencil"
                        onClick={() => {setIsOpenEditExercise(!isOpenEditExercise)}}
                    ></button>
                    <button
                        className="activeOnHover fa fa-trash-o"
                        onClick={() => props.handleDeleteExercise(props.exercise)}
                    ></button>
                </div>
            </li>
            {isOpenEditExercise &&
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
                            onClick={() => props.handleUpdateExercise(props.exercise)}
                        >
                            Edit
                        </button>
                    </div>

                </div>
            }
        </div>
    )
}

export default ExerciseListItem;