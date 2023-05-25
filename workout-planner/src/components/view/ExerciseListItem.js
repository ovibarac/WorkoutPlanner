import {useState} from "react";

const ExerciseListItem = (props) => {
    const [isOpenEditExercise, setIsOpenEditExercise] = useState(false);

    return(
        <>
            <li key={props.exercise.name}
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
                                onClick={() => props.handleUpdateExercise(props.exercise)}
                            >
                                Edit
                            </button>
                        </div>

                    </div>
                }
            </li>
        </>
    )
}

export default ExerciseListItem;