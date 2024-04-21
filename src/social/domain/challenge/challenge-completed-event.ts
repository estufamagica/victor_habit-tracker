import { domainEvent } from "../domain-event"

export type challengeCompletedEventPayload = {
    challengeId: string,
    date: Date
}

export class challengeCompletedEvent extends domainEvent<challengeCompletedEventPayload>{
    static readonly Type = 'ChallengeCompleted'

    private constructor(challengeId: string, payload: challengeCompletedEventPayload){
        super(challengeId, challengeCompletedEvent.Type, payload)
    }

    static with(challengeId: string, date: Date){
        return new challengeCompletedEvent(challengeId, {challengeId, date})
    }
}