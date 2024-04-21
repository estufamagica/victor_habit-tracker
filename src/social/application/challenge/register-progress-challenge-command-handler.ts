import { EventPublisher } from "../../domain/event-publisher";
import { challengeRepository } from "../../domain/challenge/challenge-repository";
import { registerProgressChallengeCommand } from "./register-progress-challenge-command";
import { domainEvent } from "../../domain/domain-event";

export class registerProgressChallengeCommandhandler{
    constructor(
        readonly challengeRepository: challengeRepository,
        readonly eventPublisher: EventPublisher
    ){}

    handle(command: registerProgressChallengeCommand): void {
        const challengesFromHabit = this.challengeRepository.findHabitChallenges(command.habitId)

        const events: domainEvent[] = []

        challengesFromHabit.forEach((challenge) => {
            challenge.logProgress(command.progress, command.date)
            events.push(...challenge.realeseEvents())
        })

        this.eventPublisher.publish(events)
    }
}