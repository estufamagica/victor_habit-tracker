import { domainEvent } from "../domain-event"
import { addUsersEvent } from "./add-users-event"
import { challengeStartedEvent } from "./challenge-started-event"
import { emptyFieldsError } from "./empty-field-error"

const Started_Status: string = 'STARTED'
const Achieved_Status: string = 'ACHIEVED'
const Failed_Status: string = 'FAILED'


export class challengeStatus{
    
    private constructor(
        readonly challengeId: string,
        readonly habitId: string,
        readonly objective: number,
        readonly partner: string,
        readonly project: string,
        readonly cost: number,
        readonly startDate: Date,
        readonly deadLine: Date,
        readonly progress: number,
        readonly status: string,
        readonly lastUpdate: Date,
        readonly users: string [] = [],
        readonly consecution: number = 0
    ){}

    static empty(): challengeStatus {
        return new challengeStatus(
            '',
            '',
            0,
            '',
            '',
            0,
            new Date(),
            new Date(),
            0,
            '',
            new Date()
        )
    }

    withChallengeStarted(event: challengeStartedEvent): challengeStatus{
        
        const challengeState = new challengeStatus(
            event.aggregateId,
            event.payload.habitId,
            event.payload.objective,
            event.payload.partner,
            event.payload.project,
            event.payload.cost,
            event.payload.startDate,
            event.payload.deadLine,
            0,
            Started_Status,
            event.payload.startDate,
            event.payload.users,
        )

        challengeState.checkEventPayload()

        return challengeState
    }

    withAddUsers(event: addUsersEvent): challengeStatus{
        let addedUsers: string [] = this.users

        event.payload.users.forEach((user) => {
            addedUsers.push(user)
        })
        
        const challengeState = new challengeStatus(
            this.challengeId,
            this.habitId,
            this.objective,
            this.partner,
            this.project,
            this.cost,
            this.startDate,
            this.deadLine,
            this.progress,
            this.status,
            event.payload.date,
            addedUsers
        )

        challengeState.checkEventPayload()

        return challengeState
    }

    protected checkEventPayload(): void {
        if(this.habitId.length === 0){ throw emptyFieldsError.emptyFields()}

        if(this.objective <= 0){ throw emptyFieldsError.emptyFields() }

        if(this.partner.length === 0){ throw emptyFieldsError.emptyFields()}

        if(this.project.length === 0){ throw emptyFieldsError.emptyFields()}

        if(this.cost <= 0){ throw emptyFieldsError.emptyFields()}

        if(this.deadLine == null){ throw emptyFieldsError.emptyFields()}
    }
}