import ExerciseView from "../view/ExerciseView";
import {useEffect, useState} from "react";

const ExerciseController = (props)=>{
    const [isOpenNewExercise, setIsOpenNewExercise] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [exercises, setExercises] = useState([]);



    useEffect( () => {
        const initExercises = async()=>{
            if (props.user)
                setExercises(await props.service.allExercises(props.user.id));
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
        }
    }

    const handleUpdateExercise = async (exercise) => {
        console.log("srv update ", exercise)
        props.service.updateExercise(exercise, "nou", "bou");
        const ex = await props.service.allExercises(exercise.userId);
        setExercises(ex);
    }

    const handleDeleteExercise = async (exercise) => {
        console.log("srv delete")
        props.service.deleteExercise(exercise);
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
        />
    )
}

export default ExerciseController;