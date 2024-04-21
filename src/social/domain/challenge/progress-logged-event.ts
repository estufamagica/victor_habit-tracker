import { domainEvent } from "../domain-event"

export type progressLoggedPayload = {
    readonly challengeId: string,
    readonly progress: number,
    readonly date: Date
}

export class progressLoggedEvent extends domainEvent<progressLoggedPayload> {
    static readonly Type = 'ProgressLogged'

    private constructor(challengeId: string, payload: progressLoggedPayload){
        super(challengeId, progressLoggedEvent.Type, payload)
    }

    static with(
        challengeId: string,
        progress: number,
        date: Date
    ): progressLoggedEvent {
        return new progressLoggedEvent(challengeId, {challengeId, progress, date})
    }
}