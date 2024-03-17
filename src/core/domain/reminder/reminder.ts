import { invalidHour } from "./invalid-hour-error";

export class reminder{
    constructor(
        readonly id: string,
        readonly habitId: string,
        readonly message: string,
        readonly status: boolean,
        readonly hour: number
    ){}

    static create(
        id: string,
        habitId: string,
        message: string,
        status: boolean,
        hour: number
    ){
        if(hour > 24 || hour < 0){
            throw invalidHour.withHour(hour)
        }

        return new reminder(id, habitId, message, status, hour)
    }
}