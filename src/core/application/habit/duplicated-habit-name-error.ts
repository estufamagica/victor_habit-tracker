import { baseError } from "../../error";

export class duplicatedHabitName extends baseError{
    private constructor(message: string){
        super('duplicated-habit-name', message)
    }

    static withName(name: string){
        return new duplicatedHabitName(`Duplicated habit name ${name}, please introduce another name`)
    }
}