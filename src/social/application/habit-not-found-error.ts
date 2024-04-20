import { baseError } from "../error";

export class habitNotFound extends baseError{
    private constructor(message: string){
        super('habit-not-found', message)
    }

    static withId(habitId: string){
        return new habitNotFound(`Habit with id ${habitId} not found.`)
    }
}