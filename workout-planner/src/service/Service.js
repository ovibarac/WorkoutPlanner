import UserRepo from '../repo/UserRepo.js'
import Exercise from "../model/Exercise";
import ExerciseRepo from "../repo/ExerciseRepo";

class Service{
    userRepo;
    exerciseRepo;
    constructor(){
        this.userRepo = new UserRepo();
        this.exerciseRepo = new ExerciseRepo();
        this.findUser = this.findUser.bind(this);
    }

    async findUser(username, password) {
        const user = await this.userRepo.findOne(username, password)
        console.log("Service findUser: ", user);
        return user;
    }

    addUser(username, password){
        const user=this.userRepo.add(username, password);
        return user;
    }

    async addExercise(name, description, userId) {
        console.log(userId);
        const exercise = await this.exerciseRepo.add(name, description, userId);
        // console.log("Service addExercise: ", exercise);
        return exercise;
    }

    async allExercises(userId) {
        const exercises = await this.exerciseRepo.findAll(userId);
        console.log("Service allExercises: ", exercises);
        return exercises;
    }

    async updateExercise(exercise, newName, newDescription){
        console.log("service update ", newName, " ", newDescription)
        await this.exerciseRepo.update(exercise, newName, newDescription)
    }

    async deleteExercise(exercise){
        await this.exerciseRepo.delete(exercise.id)
    }
}

export default Service;