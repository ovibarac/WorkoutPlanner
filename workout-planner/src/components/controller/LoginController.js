import {useState} from "react";
import Service from "../../service/Service";
import LoginView from "../view/LoginView";
import UserController from "./UserController";

function LoginController({service}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [trainer, setTrainer] = useState(false);

    const handleLogin = async () => {
        const user = await service.findUser(username, password);
        if(user != null){
            setLoggedUser(user);
            setLoggedIn(true);
        }
    }

    const handleSignUp = async () => {
        const user = await service.addUser(username, password, trainer);
        if(user != null){
            setLoggedUser(user);
            setLoggedIn(true);
        }
    }

    return(
        <>
            {!loggedIn &&
                <LoginView
                    username={username}
                    onChangeUsername={e => setUsername(e.target.value)}
                    password={password}
                    onChangePassword={e => setPassword(e.target.value)}
                    onLogin={handleLogin}
                    onSignUp={handleSignUp}
                    onChangeTrainer={e => setTrainer(e.target.checked)}
                />
            }
            {loggedIn &&
                <UserController
                    service={service}
                    user={loggedUser}
                />
            }
        </>
    )
}

export default LoginController;