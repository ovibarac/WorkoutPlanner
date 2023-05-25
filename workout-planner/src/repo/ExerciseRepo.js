import { baseUrl } from '../baseurl';
import {UserTypes} from "../model/User";
class ExerciseRepo{

    userModel;
    constructor(){

    }

    async findAll(userId){
        console.log("Repo findALl id", userId)
        let req={
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        return await fetch(`${baseUrl}workout-planner/exercises/${userId}`, req)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("repo findall response ", responseJson);
                return responseJson;
            })
            .catch((error) => {
                return null;
            })
    }

    async add(name, description, userId) {
        let req = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
                userId: userId
            }),
        };
        await fetch(`${baseUrl}workout-planner/exercise/`, req)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // return responseJson;
            })
            .catch((error) => {
                return null;
            })
    }

    async update(exercise, newName, newDescription){
        console.log("Repo update ", exercise.id, " name ", newName, " desc ", newDescription)
        let req = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                description: newDescription,
                exercise: exercise
            }),
        };
        await fetch(`${baseUrl}workout-planner/exercise/update`, req)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // return responseJson;
            })
            .catch((error) => {
                return null;
            })
    }

    async delete(id){
        console.log("Repo delete ", id)
        let req={
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        return await fetch(`${baseUrl}workout-planner/exercise/delete/${id}`, req)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
            })
            .catch((error) => {
                return null;
            })
    }
}

export default ExerciseRepo;