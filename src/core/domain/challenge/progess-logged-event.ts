import { domainEvent } from "../domain-event";

export class ProgessLoggedEvent extends domainEvent{
    static readonly type = 'Challenge Progress Logged'

    private constructor(
        challengeId: string,
        payload: string
    ){
        super(challengeId, ProgessLoggedEvent.type, payload)
    }

    static with(
        challengeId: string,
        payload: string,
    ): ProgessLoggedEvent {
        return new ProgessLoggedEvent(challengeId, payload)
    }
}