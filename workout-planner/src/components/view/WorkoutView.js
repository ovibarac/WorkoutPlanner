import NewWorkoutView from "./NewWorkoutView";
import "../../styles/Workout.css"
import {useState} from "react";
import WorkoutListItem from "./WorkoutListItem";
const WorkoutView = (props) =>{
    return(
        <div className="workoutView">
            <div id="addUI">
                <button
                    id="newWorkoutBtn"
                    onClick={props.handleNewWorkout}
                    className="fa fa-plus-circle"
                ></button>
                {props.isOpenNewWorkout &&
                    <NewWorkoutView
                        handleAddWorkout={props.handleAddWorkout}
                        newName={props.newName}
                        handleChangeAddName={props.handleChangeAddName}
                        newDesc={props.newDesc}
                        handleChangeAddDesc={props.handleChangeAddDesc}
                    />
                }
            </div>

            <div id="workoutList">
                <ul>
                    {props.workouts === null ? (
                        <div>Loading...</div>
                    ) : (
                    props.workouts.length >0 && props.workouts.map((workout) => (
                        <WorkoutListItem
                            workout={workout}
                            handleEditView={props.handleEditView}
                            handleUpdateWorkout={props.handleUpdateWorkout}
                            handleDeleteWorkout={props.handleDeleteWorkout}
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

export default WorkoutView;