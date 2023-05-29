import ExerciseController from "../controller/ExerciseController";
import WorkoutController from "../controller/WorkoutController";
import {Button, Drawer, SwipeableDrawer} from '@mui/material';
import {useState} from "react";

const UserView = (props) => {
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