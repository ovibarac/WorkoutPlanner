import '../../styles/Login.css'
import '../../styles/App.css'

const LoginView = (props) =>{
    return(
        <>
            <input
                className="loginUi"
                id='username'
                type='text'
                placeholder="username"
                value={props.username}
                onChange={props.onChangeUsername}
            />
            <input
                className="loginUi"
                id='password'
                type='password'
                placeholder="password"
                value={props.password}
                onChange={props.onChangePassword}
            />
            <div className="buttons">
                <button id="login" onClick={props.onLogin} className="loginUi">Log in</button>
                <button id="signup" onClick={props.onSignUp} className="loginUi">Sign up</button>
            </div>

        </>
    )
}

export default LoginView;