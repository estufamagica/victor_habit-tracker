import { EventPublisher } from "../../domain/event-publisher";
import { challengeRepository } from "../../domain/challenge/challenge-repository";
import { addUsersChallengeCommand } from "./add-users-challenge-command";
import { challengeNotFoundError } from "./challenge-not-found-error";
import { domainEvent } from "src/core/domain/domain-event";

export class addUsersChallengeCommandHandler{
    constructor(
        readonly challengeRepository: challengeRepository,
        readonly eventPublisher: EventPublisher
    ){}

    handle(command: addUsersChallengeCommand){
        if(!this.challengeRepository.findbyId(command.challengeId)){
            throw challengeNotFoundError.withId(command.challengeId)
        }

        const challenge = this.challengeRepository.findbyId(command.challengeId)

        const events: domainEvent[] = []

        challenge.addUsers(command.users, command.date)

        events.push(...challenge.realeseEvents())

        this.eventPublisher.publish(events)
    }
}