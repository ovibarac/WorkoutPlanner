import NewExerciseView from "./NewExerciseView";
import "../../styles/Exercise.css"
import {useState} from "react";
const ExerciseView = (props) =>{
    //TODO make separate component and have const [isOpenEditExercise, setIsOpenEditExercise] = useState(false); as state
    return(
        <div className="exerciseView">
            <div id="addUI">
                <button
                    id="newExerciseBtn"
                    onClick={props.handleNewExercise}
                    className="fa fa-plus-circle"
                ></button>
                {props.isOpenNewExercise &&
                    <NewExerciseView
                        handleAddExercise={props.handleAddExercise}
                        newName={props.newName}
                        handleChangeAddName={props.handleChangeAddName}
                        newDesc={props.newDesc}
                        handleChangeAddDesc={props.handleChangeAddDesc}
                    />
                }
            </div>

            <div id="exerciseList">
                <ul>
                    {props.exercises.length >0 && props.exercises.map((exercise) => (
                        <li key={exercise.name}
                            className="exerciseListItem">

                            <h1>{exercise.name}</h1>
                            <p>{exercise.description}</p>
                            <div id="editDeleteContainer">
                                <button
                                    className="activeOnHover fa fa-pencil"
                                    onClick={props.handleEditView}
                                ></button>
                                <button
                                    className="activeOnHover fa fa-trash-o"
                                    onClick={() => props.handleDeleteExercise(exercise)}
                                ></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ExerciseView;