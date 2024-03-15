import { UserRepository } from "../../infraestructure/in-memory/user-repository";
import { habitRepository } from "../../infraestructure/in-memory/habit-repository";
import { viewHabitListCommand } from "./view-habit-list-command";
import { UserNotFound } from "../user-not-found-error";
import { HabitsNotFound } from "./habits-not-found-error";
import { habit } from "../../domain/habit/habit";

export class viewHabitCommandhandler{
    constructor(
        private readonly HabitRepository: habitRepository,
        private readonly userRepository: UserRepository
    ){}

    handle(command: viewHabitListCommand){
        if(!this.userRepository.findById(command.userId)){
            throw UserNotFound.withId(command.userId)
        }

        if(!this.HabitRepository.userHasHabits(command.userId)){
            throw HabitsNotFound.withUserId(command.userId)
        }

        const result: habit[] = this.HabitRepository.findUserHabits(command.userId)

        return result
    }
}