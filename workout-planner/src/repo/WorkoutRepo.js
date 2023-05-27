import { baseUrl } from '../baseurl';
import {UserTypes} from "../model/User";
class WorkoutRepo{

    userModel;
    constructor(){

    }

    async findAll(userId){
        console.log("W Repo findALl id", userId)
        let req={
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        return await fetch(`${baseUrl}workout-planner/workouts/${userId}`, req)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("w repo findall response ", responseJson);
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
        await fetch(`${baseUrl}workout-planner/workout/`, req)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // return responseJson;
            })
            .catch((error) => {
                return null;
            })
    }

    async update(workout, newName, newDescription){
        console.log("W Repo update ", workout.id, " name ", newName, " desc ", newDescription)
        let req = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                description: newDescription,
                workout: workout
            }),
        };
        await fetch(`${baseUrl}workout-planner/workout/update`, req)
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
        console.log("W Repo delete ", id)
        let req={
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        return await fetch(`${baseUrl}workout-planner/workout/delete/${id}`, req)
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

export default WorkoutRepo;