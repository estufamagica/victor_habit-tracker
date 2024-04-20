import { baseError } from "../../error";

export class invalidHabitFields extends baseError{
    private constructor(message: string){
        super('invalid-habit-fields', message)
    }

    static emptyName(){
        return new invalidHabitFields('Empty habit name provided, please enter a valid name')
    }

    static emptyFrequency(){
        return new invalidHabitFields('Empty frequency habit provided, please enter a valid frequency')
    }

    static emptyDuration(){
        return new invalidHabitFields('Empty duration habit provided, please enter a valid duration')
    }

    static emptyRest(){
        return new invalidHabitFields('Empty rest time habit provided, please enter a valid rest time')
    }
}