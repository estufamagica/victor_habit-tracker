import { baseError } from "../../error";

export class duplicatedReminder extends baseError{
    private constructor(message: string){
        super('duplicated-reminder-error', message)
    }

    static withId(id: string){
        return new duplicatedReminder(`Reminder with id ${id} already exists.`)
    }
}