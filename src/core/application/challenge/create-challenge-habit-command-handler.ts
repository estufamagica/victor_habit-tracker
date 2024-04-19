import { UserRepository } from "../../infraestructure/in-memory/user-repository";
import { habitRepository } from "../../infraestructure/in-memory/habit-repository";
import { createChallengeHabitCommand } from "./create-challenge-habit-command";
import { challengeRepository } from "../../infraestructure/in-memory/challenge-repository";
import { challenge } from "../../domain/challenge/challenge";
import { habitNotFound } from "../habit-not-found-error";
import { duplicatedChallenge } from "./duplicated-challenge-error";

export class CreateChallengehabitCommandHandler{
    constructor(
        private readonly habitRepository: habitRepository,
        private readonly challengeRepository: challengeRepository
    ){}

    handle(command: createChallengeHabitCommand){
        
        if(!this.habitRepository.findbyId(command.habitId)){
            throw habitNotFound.withId(command.habitId)
        }

        if(this.challengeRepository.findByID(command.id)){
            throw duplicatedChallenge.withId(command.id)
        }

       this.challengeRepository.save(
        challenge.create(
            command.id,
            command.habitId,
            command.description,
            command.times,
            command.startDate,
            command.deadLine,
            'Pendiente'
        )
       ) 
    }
}