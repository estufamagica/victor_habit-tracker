import { domainEvent } from "../domain-event"
import { EventSourcedEntity } from "../event-sourced-entity"
import { challengeStartedEvent } from "./challenge-started-event"
import { challengeStatus } from "./challenge-status"
import { v4 as uuidv4 } from 'uuid'


export class challenge extends EventSourcedEntity{
    private status: challengeStatus

    private constructor(stream: Array<domainEvent> = []){
        super(stream)
        if(stream.length === 0){
            this.status = challengeStatus.empty()
        }
    }

    protected when(event: domainEvent){
        switch(event.type){
            case challengeStartedEvent.Type:
                this.whenChallengeStarted(event as unknown as challengeStartedEvent)
        }
    }

    private whenChallengeStarted(event: challengeStartedEvent){
        this.status = challengeStatus.withChallengeStarted(event)
    }

    static create(stream: Array<domainEvent>){
        return new challenge(stream)
    }

    start(
        id: string,
        habitId: string,
        objective: number,
        partner: string,
        project: string,
        cost: number,
        users: string [],
        startDate: Date,
        deadLine: Date
    ){
        this.apply(challengeStartedEvent.with(
            id,
            habitId,
            objective,
            partner,
            project,
            cost,
            users,
            startDate,
            deadLine
            ))
    }

    static createStarted(
        habitId: string,
        objective: number,
        partner: string,
        project: string,
        cost: number,
        users: string [],
        startDate: Date,
        deadLine: Date
    ): challenge {
        const id = uuidv4()
        
        const challenge_c = new challenge()

        challenge_c.start(id, habitId, objective, partner, project, cost, users, startDate, deadLine)

        return challenge_c
    }
}