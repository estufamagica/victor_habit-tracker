import { invalidDates } from "../invalid-dates-error"
import { cancelChallengeError } from "./cancelChallengeError"
import { ChallengeStatus } from "./challengeStatus"
import { invalidDescriptionLength } from "./invalid-description-length-error"
import { invalidNumberTimes } from "./invalid-number-times-error"



export class challenge{
    constructor(
        readonly id: string,
        readonly habitId: string,
        readonly description: string,
        readonly numberOfTimes: number,
        readonly starDate: Date,
        readonly deadLine: Date,
        private status: ChallengeStatus
    ){}

    static create(
        id: string,
        habitId: string,
        description: string,
        times: number,
        starDate: Date,
        deadLine: Date,
        status: string
    ){

        if(description.length > 30){
            throw invalidDescriptionLength.withDescription(description.length)
        }

        if(times <= 0){
            throw invalidNumberTimes.withNumber(times)
        }

        if(starDate > deadLine){
            throw invalidDates.withDates()
        }

        return new challenge(id, habitId, description, times, starDate, deadLine, new ChallengeStatus(status))
    }

    isCanceled(){
        return this.status.challenge_status === 'Cancelado'
    }

    cancelChallenge(){
        if(this.status.challenge_status === 'Cancelado' || this.status.challenge_status === 'Completado'){
            throw cancelChallengeError.withStatus(this.status.challenge_status)
        }

        this.status = ChallengeStatus.Cancelled()
    }
}