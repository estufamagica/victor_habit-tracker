import { baseError } from "../../error";

export class invalidHour extends baseError{
    private constructor(message: string){
        super('invalid-hour', message)
    }

    static withHour(hour: number){
        return new invalidHour(`Invalid hour given: ${hour}, please introduce an hour between 0 and 23.`)
    }
}