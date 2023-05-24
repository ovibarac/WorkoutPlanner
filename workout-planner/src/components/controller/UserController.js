import UserView from "../view/UserView";
import ExerciseController from "./ExerciseController";

const UserController = (props) => {

    return(
        <>
            <UserView/>
            <ExerciseController
                service={props.service}
                user={props.user}
            />
        </>
    )
}

export default UserController;
