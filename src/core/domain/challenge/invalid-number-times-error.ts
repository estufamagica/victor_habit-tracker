import { baseError } from "../../error";

export class invalidNumberTimes extends baseError{
    private constructor(message: string){
        super('invalid-number-times', message)
    }

    static withNumber(number: number){
        return new invalidNumberTimes(`Invalid number of times: ${number}. Please enter a valid number of times.`)
    }
}