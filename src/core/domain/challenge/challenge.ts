import { invalidDates } from "../invalid-dates-error"
import { invalidDescriptionLength } from "./invalid-description-length-error"
import { invalidNumberTimes } from "./invalid-number-times-error"

export class challenge{
    constructor(
        readonly id: string,
        readonly habitId: string,
        readonly description: string,
        readonly numberOfTimes: number,
        readonly starDate: Date,
        readonly deadLine: Date
    ){}

    static create(
        id: string,
        habitId: string,
        description: string,
        times: number,
        starDate: Date,
        deadLine: Date
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

        return new challenge(id, habitId, description, times, starDate, deadLine)
    }
}