import WorkoutView from "../view/WorkoutView";
import {useEffect, useState} from "react";

const WorkoutController = (props)=>{
    const [isOpenNewWorkout, setIsOpenNewWorkout] = useState(false);
    const [isOpenEditWorkout, setIsOpenEditWorkout] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [workouts, setWorkouts] = useState([]);

    useEffect( () => {
        const initWorkouts = async()=>{
            if (props.user){
                const workouts = await props.service.allWorkouts(props.user.id)
                if(workouts !== null && workouts.length!==0){
                    setWorkouts(workouts);
                }
            }
        }

        initWorkouts();
    }, [props.service, props.user])

    const handleNewWorkout = ()=>{
        setIsOpenNewWorkout(!isOpenNewWorkout);
    }

    const handleAddWorkout = async () => {
        const id = await props.user.id;
        if(newName !== "" && newDesc !== ""){
            await props.service.addWorkout(newName, newDesc, id);
            const ex = await props.service.allWorkouts(id);
            setWorkouts(ex);
            setNewName("");
            setNewDesc("");
        }
    }

    const handleEditView = () => {
        setIsOpenEditWorkout(!isOpenEditWorkout);
    }

    const handleUpdateWorkout = async (workout) => {
        console.log("ctrl update workout ", workout)
        await props.service.updateWorkout(workout, editName, editDesc);
        const ex = await props.service.allWorkouts(workout.userId);
        console.log("new workouts ", ex)
        setWorkouts(ex);
        setEditName("");
        setEditDesc("");
    }

    const handleDeleteWorkout = async (workout) => {
        console.log("srv delete workout ")
        await props.service.deleteWorkout(workout);
        const ex = await props.service.allWorkouts(workout.userId);
        setWorkouts(ex);
    }


    return(
        <WorkoutView
            isOpenNewWorkout={isOpenNewWorkout}
            handleNewWorkout={handleNewWorkout}
            newName={newName}
            newDesc={newDesc}
            handleChangeAddName={e => setNewName(e.target.value)}
            handleChangeAddDesc={e => setNewDesc(e.target.value)}
            handleAddWorkout={handleAddWorkout}
            handleUpdateWorkout={handleUpdateWorkout}
            handleDeleteWorkout={handleDeleteWorkout}
            workouts={workouts}
            editName={editName}
            editDesc={editDesc}
            handleChangeEditName={e => setEditName(e.target.value)}
            handleChangeEditDesc={e => setEditDesc(e.target.value)}
            handleEditView={handleEditView}
            isOpenEditWorkout={isOpenEditWorkout}
        />
    )
}

export default WorkoutController;