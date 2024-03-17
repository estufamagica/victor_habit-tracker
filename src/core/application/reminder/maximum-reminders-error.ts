import { baseError } from "../../error";

export class maximumRemindersError extends baseError{
    private constructor(message: string){
        super('maximum-reminders-error', message)
    }

    static withHabitId(id: string){
        return new maximumRemindersError(`Habit with id ${id} already has 3 reminders`)
    }
}