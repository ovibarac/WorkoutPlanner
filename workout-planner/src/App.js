import logo from './logo.svg';
import './styles/App.css';
import {useState} from "react";
import Service from "./service/Service"
import LoginController from "./components/controller/LoginController";

function App() {
    const [service, setService] = useState(new Service())
  return (
    <div className="App">
      <LoginController service={service}/>
    </div>
  );
}

export default App;
