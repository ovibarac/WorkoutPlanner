import UserRepo from '../repo/UserRepo.js'
import Exercise from "../model/Exercise";
import ExerciseRepo from "../repo/ExerciseRepo";
import WorkoutRepo from "../repo/WorkoutRepo";
import {UserTypes} from "../model/User";

class Service{
    userRepo;
    exerciseRepo;
    workoutRepo;

    constructor(){
        this.userRepo = new UserRepo();
        this.exerciseRepo = new ExerciseRepo();
        this.workoutRepo = new WorkoutRepo();
        this.findUser = this.findUser.bind(this);
    }

    async findUser(username, password) {
        const user = await this.userRepo.findOne(username, password)
        console.log("Service findUser: ", user);
        return user;
    }

    addUser(username, password, trainer){
        const userType = trainer === true ? UserTypes.TRAINER : UserTypes.USER;
        const user=this.userRepo.add(username, password, userType);
        console.log(user);
        return user;
    }

    async addExercise(name, description, userId) {
        const exercise = this.exerciseRepo.add(name, description, userId);
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

    async addWorkout(name, description, userId) {
        const workout = await this.workoutRepo.add(name, description, userId);
        // console.log("Service addExercise: ", exercise);
        return workout;
    }

    async updateWorkout(workout, newName, newDescription){
        console.log("service update w ", newName, " ", newDescription)
        await this.workoutRepo.update(workout, newName, newDescription)
    }

    async deleteWorkout(workout){
        await this.workoutRepo.delete(workout.id)
    }

    async allWorkouts(userId) {
        const workouts = await this.workoutRepo.findAll(userId);
        console.log("Service allWorkouts: ", workouts);
        return workouts;
    }
}

export default Service;