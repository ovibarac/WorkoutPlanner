import NewExerciseView from "./NewExerciseView";
import "../../styles/Exercise.css"
import {useState} from "react";
import ExerciseListItem from "./ExerciseListItem";
const ExerciseView = (props) =>{
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
                    {props.workouts === null ? (
                        <div>Loading...</div>
                    ) : (
                        props.exercises.length >0 && props.exercises.map((exercise) => (
                                <ExerciseListItem
                                    exercise={exercise}
                                    handleEditView={props.handleEditView}
                                    handleUpdateExercise={props.handleUpdateExercise}
                                    handleDeleteExercise={props.handleDeleteExercise}
                                    editName={props.editName}
                                    editDesc={props.editDesc}
                                    handleChangeEditName={props.handleChangeEditName}
                                    handleChangeEditDesc={props.handleChangeEditDesc}
                                />
                            ))
                    )}

                </ul>
            </div>
        </div>
    )
}

export default ExerciseView;