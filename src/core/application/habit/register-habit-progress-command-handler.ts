import { UserRepository } from "../../infraestructure/in-memory/user-repository";
import { habitRepository } from "../../infraestructure/in-memory/habit-repository";
import { registerHabitProgressCommand } from "./register-habit-progress-command";
import { UserNotFound } from "../user-not-found-error";
import { duplicatedHabitName } from "./duplicated-habit-name-error";
import { habit } from "../../domain/habit/habit";

export class registerHabitProgressCommandhandler{
    constructor(
        private readonly habitRepository: habitRepository,
        private readonly userRepository: UserRepository
    ){}

    handle(command: registerHabitProgressCommand){
        if(!this.userRepository.findById(command.userId)){
            throw UserNotFound.withId(command.userId)
        }

        if(this.habitRepository.findbyName(command.name)){
            throw duplicatedHabitName.withName(command.name)
        }

        this.habitRepository.save(habit.createWithProgess(
            command.id,
            command.name,
            command.description,
            command.frequency,
            command.duration,
            command.restTime,
            command.userId,
            command.progress
        ))
    }
}