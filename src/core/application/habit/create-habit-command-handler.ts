import { habit } from "../../domain/habit/habit";
import { habitRepository } from "../../infraestructure/in-memory/habit-repository";
import { UserRepository } from "../../infraestructure/in-memory/user-repository";
import { UserNotFound } from "../user-not-found-error";
import { createHabitCommand } from "./create-habit-command";
import { duplicatedHabitName } from "./duplicated-habit-name-error";

export class CreateHabitCommandhandler{
    constructor(
        private readonly habitRepository: habitRepository,
        private readonly userRepository: UserRepository
    ){}

    handle(command: createHabitCommand){
        if(!this.userRepository.findById(command.userId)){
            throw UserNotFound.withId(command.userId)
        }

        if(this.habitRepository.findbyName(command.name)){
            throw duplicatedHabitName.withName(command.name)
        }

        this.habitRepository.save(habit.create(
            command.id,
            command.name,
            command.description,
            command.frequency,
            command.duration,
            command.restTime,
            command.userId,
            0,
            command.wearableDeviceid
        ))
    }
}