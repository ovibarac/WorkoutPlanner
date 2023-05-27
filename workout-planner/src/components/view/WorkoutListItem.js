import {useState} from "react";

const WorkoutListItem = (props) => {
    const [isOpenEditWorkout, setIsOpenEditWorkout] = useState(false);

    return(
        <div id="wrapperListItem">
            <li key={props.workout.id}
                className="workoutListItem">

                <h1>{props.workout.name}</h1>
                <p>{props.workout.description}</p>
                <div id="editDeleteContainer">
                    <button
                        className="activeOnHover fa fa-pencil"
                        onClick={() => {setIsOpenEditWorkout(!isOpenEditWorkout)}}
                    ></button>
                    <button
                        className="activeOnHover fa fa-trash-o"
                        onClick={() => props.handleDeleteWorkout(props.workout)}
                    ></button>
                </div>
            </li>
            {isOpenEditWorkout &&
                <div id="editWorkout">
                    <div id="innerEditWorkout">
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
                            onClick={() => props.handleUpdateWorkout(props.workout)}
                        >
                            Edit
                        </button>
                    </div>

                </div>
            }
        </div>
    )
}

export default WorkoutListItem;