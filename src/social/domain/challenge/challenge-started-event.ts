import { domainEvent } from "../domain-event"

export type challengeStartedPayload = {
    readonly challengeId: string,
    readonly habitId: string,
    readonly objective: number,
    readonly partner: string,
    readonly project: string,
    readonly cost: number,
    readonly users: string[]
    readonly startDate: Date,
    readonly deadLine: Date
}

export class challengeStartedEvent extends domainEvent<challengeStartedPayload>{
    static readonly Type = 'Challenge-Started'

    private constructor(challengeId: string, payload: challengeStartedPayload){
        super(challengeId, challengeStartedEvent.Type, payload)
    }

    static with(
        challengeId: string,
        habitId: string,
        objective: number,
        partner: string,
        project: string,
        cost: number,
        users: string [],
        startDate: Date,
        deadLine: Date
    ): challengeStartedEvent {
        return new challengeStartedEvent(challengeId, {challengeId, habitId, objective, partner, project, cost, users, startDate, deadLine})
    }
}