import ExerciseController from "../controller/ExerciseController";
import WorkoutController from "../controller/WorkoutController";
import {Button, Drawer, SwipeableDrawer} from '@mui/material';
import {useState} from "react";

const UserView = (props) => {
    //TODO sa nu dea eroare cand e goala lista
    //TODO meniu
    //TODO daca mai am timp add workout to day daca nu is 6 funct oricum
    //TODO change workout model to include many to many relationship with exercises
    //TODO workout UI to add dar cred ca il las exact ca exercise cel putin la inceput
    const [openDrawer, setOpenDrawer] = useState(false);
    return(
        <>
            <ExerciseController
                service={props.service}
                user={props.user}
            />
            <WorkoutController
                service={props.service}
                user={props.user}
            />
        </>
    )
}

export default UserView;