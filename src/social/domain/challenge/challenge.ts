import { domainEvent } from "../domain-event"
import { EventSourcedEntity } from "../event-sourced-entity"
import { addUsersEvent } from "./add-users-event"
import { challengeStartedEvent } from "./challenge-started-event"
import { challengeStatus } from "./challenge-status"
import { v4 as uuidv4 } from 'uuid'
import { emptyFieldsError } from "./empty-field-error"
import { progressLoggedEvent } from "./progress-logged-event"
import { challengeCompletedEvent } from "./challenge-completed-event"


export class challenge extends EventSourcedEntity{
    private status: challengeStatus
    readonly challengeId: string = uuidv4()

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
                break
            case addUsersEvent.Type:
                this.whenAddUsers(event as unknown as addUsersEvent)
                break
            case progressLoggedEvent.Type:
                this.whenProgressLogged(event as unknown as progressLoggedEvent)
                break
            case challengeCompletedEvent.Type:
                this.whenChallengeCompleted(event as unknown as challengeCompletedEvent)
                break
        }
    }

    private whenChallengeStarted(event: challengeStartedEvent){
        this.status = this.status.withChallengeStarted(event)
    }

    private whenAddUsers(event: addUsersEvent){
        this.status = this.status.withAddUsers(event)
    }

    private whenProgressLogged(event: progressLoggedEvent){
        this.status = this.status.withProgressLogged(event)
    }

    private whenChallengeCompleted(event: challengeCompletedEvent){
        this.status = this.status.withChallengeCompleted(event)
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

        const challenge_c = new challenge()

        challenge_c.start(challenge_c.challengeId, habitId, objective, partner, project, cost, users, startDate, deadLine)

        return challenge_c
    }

    addUsers(users: string[], date: Date){
        if(users.length === 0){
            throw emptyFieldsError.emptyFields()
        }

        this.apply(addUsersEvent.with(this.status.challengeId, users, date))
    }

    getStatus(){ return this.status}

    logProgress(progress: number, date: Date){
        
        this.apply(progressLoggedEvent.with(this.challengeId, progress, date))

        if(this.status.hasReachedTheObjective()){
            this.apply(challengeCompletedEvent.with(this.challengeId, date))
        }

    }
}