import { EventPublisher } from "src/core/domain/event-publisher";
import { challengeRepository } from "src/core/infraestructure/in-memory/challenge-repository";
import { challengeProgressCommand } from "./challenge-progress-command";
import { ProgessLoggedEvent } from "src/core/domain/challenge/progess-logged-event";

export class challengeProgressEventHandler{
    constructor(
        readonly challengeRespository: challengeRepository,
        readonly eventPublisher: EventPublisher
    ){}

    handle(command: challengeProgressCommand){
        const challenges = this.challengeRespository.findHabitChallenges(command.habitId)

        challenges.forEach(challenge => {
            if(!challenge.isCanceled()){
                let event: ProgessLoggedEvent = ProgessLoggedEvent.with(challenge.id, challenge.id + '|' + command.progress + '|' + command.date)
                this.eventPublisher.publish(event)
                //Esto generaria un logro
            }
        })
    }
}