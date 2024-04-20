import { EventPublisher } from "../../domain/event-publisher";
import { startChallengeCommand } from "./start-challenge-command";
import { habitRepository } from "../../domain/habit/habit-repository";
import { habitNotFound } from "../habit-not-found-error";
import { challenge } from "../../domain/challenge/challenge";

export class startChallengeCommandHandler{
    constructor(
        private readonly habitRepository: habitRepository,
        private readonly eventPublisher: EventPublisher
    ){}

    handle(command: startChallengeCommand){

        if(!this.habitRepository.findbyId(command.habitId)){
            throw habitNotFound.withId(command.habitId)
        }

        const challenge_local = challenge.createStarted(
            command.habitId,
            command.objective,
            command.partner,
            command.project,
            command.cost,
            command.usuarios,
            new Date(),
            command.deadLine
        )

        this.eventPublisher.publish(challenge_local.realeseEvents())
    }
}