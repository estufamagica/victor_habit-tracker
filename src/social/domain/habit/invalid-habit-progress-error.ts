import { baseError } from "../../error";

export class invalidHabitProgress extends baseError{
    private constructor(message: string){
        super('invalid-habit-progress', message)
    }

    static withProgress(progress: number){
        return new invalidHabitProgress(`Invalid progress given: ${progress}. Please enter a number between 0 and 100.`)
    }
}