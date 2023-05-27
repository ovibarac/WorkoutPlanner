import { baseUrl } from '../baseurl';
import {User, UserTypes} from "../model/User";
import {resolve} from "url";
class UserRepo{

    userModel;
    constructor(){

    }

    async findOne(username, password){
        let req={
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        const user = await fetch(`${baseUrl}workout-planner/user/${username}/${password}`, req)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("json", responseJson);
                return new User(responseJson[0].id, responseJson[0].username, responseJson[0].password, responseJson[0].type);
            })
            .catch((error) => {
                return null;
            })
        return user;
    }

    async add(username, password, type) {
        let req = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                type: type,
            }),
        };
        await fetch(`${baseUrl}workout-planner/user/`, req)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log("UserRepo add: ", responseJson);
                // return responseJson;
            })
            .catch((error) => {
                return null;
            })
    }
}

export default UserRepo;