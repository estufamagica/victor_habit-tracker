import { baseError } from "../../error";

export class invalidHabitSchedule extends baseError{
    private constructor(message: string){
        super('invalid-habit-schedule', message)
    }

    static create(
        frequency: number,
        duration: number,
        restTime: number
    ): invalidHabitSchedule {
        return new invalidHabitSchedule(`Invalid habit shedule: frequency: ${frequency}, duration: ${duration}, rest time: ${restTime}`)
    }
}