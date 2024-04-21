import { domainEvent } from "../domain-event";

export type addUsersPayload = {
    readonly challengeId: string,
    readonly users: string [], 
    readonly date: Date
}

export class addUsersEvent extends domainEvent<addUsersPayload>{
    static readonly Type = 'AddUsers'

    private constructor(
        challengeId: string,
        payload: addUsersPayload,
    ){
        super(challengeId, addUsersEvent.Type, payload)
    }

    static with(
        challengeId: string,
        users: string [],
        date: Date
    ):addUsersEvent{
        return new addUsersEvent(challengeId, {challengeId, users, date})
    }
}