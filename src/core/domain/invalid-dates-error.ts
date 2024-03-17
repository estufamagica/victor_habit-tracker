import { baseError } from "../error";

export class invalidDates extends baseError{
    private constructor(message: string){
        super('invalid-dates', message)
    }

    static withDates(){
        return new invalidDates(`Invalid dates given. Please introduce a set of valid dates.`)
    }
}