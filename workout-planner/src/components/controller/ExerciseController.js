import ExerciseView from "../view/ExerciseView";
import {useEffect, useState} from "react";

const ExerciseController = (props)=>{
    const [isOpenNewExercise, setIsOpenNewExercise] = useState(false);
    const [isOpenEditExercise, setIsOpenEditExercise] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [exercises, setExercises] = useState([]);



    useEffect( () => {
        const initExercises = async()=>{
            if (props.user){
                const exercises = await props.service.allExercises(props.user.id)
                if(exercises !== null && exercises.length!==0){
                    setExercises(exercises);
                }
            }
        }

        initExercises();
    }, [props.service, props.user])

    const handleNewExercise = ()=>{
        setIsOpenNewExercise(!isOpenNewExercise);
    }

    const handleAddExercise = async () => {
        const id = await props.user.id;
        if(newName !== "" && newDesc !== ""){
            await props.service.addExercise(newName, newDesc, id);
            const ex = await props.service.allExercises(id);
            setExercises(ex);
            setNewName("");
            setNewDesc("");
        }
    }

    const handleEditView = () => {
        setIsOpenEditExercise(!isOpenEditExercise);
    }

    const handleUpdateExercise = async (exercise) => {
        console.log("ctrl update ", exercise)
        await props.service.updateExercise(exercise, editName, editDesc);
        const ex = await props.service.allExercises(exercise.userId);
        console.log("new exercises ", ex)
        setExercises(ex);
        setEditName("");
        setEditDesc("");
    }

    const handleDeleteExercise = async (exercise) => {
        console.log("srv delete")
        await props.service.deleteExercise(exercise);
        const ex = await props.service.allExercises(exercise.userId);
        setExercises(ex);
    }


    return(
        <ExerciseView
            isOpenNewExercise={isOpenNewExercise}
            handleNewExercise={handleNewExercise}
            newName={newName}
            newDesc={newDesc}
            handleChangeAddName={e => setNewName(e.target.value)}
            handleChangeAddDesc={e => setNewDesc(e.target.value)}
            handleAddExercise={handleAddExercise}
            handleUpdateExercise={handleUpdateExercise}
            handleDeleteExercise={handleDeleteExercise}
            exercises={exercises}
            editName={editName}
            editDesc={editDesc}
            handleChangeEditName={e => setEditName(e.target.value)}
            handleChangeEditDesc={e => setEditDesc(e.target.value)}
            handleEditView={handleEditView}
            isOpenEditExercise={isOpenEditExercise}
        />
    )
}

export default ExerciseController;