import { invalidHabitFields } from "./invalid-habit-fields-error";
import { invalidHabitProgress } from "./invalid-habit-progress-error";
import { Schedule } from "./schedule";

export class habit{
    constructor(
        readonly id: string, 
        readonly name: string,
        readonly description: string,
        readonly schedule: Schedule,
        readonly userId: string,
        readonly progress: number = 0,
        readonly creation_date: Date = new Date(),
        readonly update_date: Date = new Date(),
    ){}

    static create(
        id: string,
        name: string,
        description: string,
        frequency: number, 
        duration: number,
        restTime: number,
        userId: string,
        creation_date: Date = new Date(),
        update_date: Date = new Date()
    ):habit {
        if(name.length == 0){
            throw invalidHabitFields.emptyName()
        }

        if(frequency == null){
            throw invalidHabitFields.emptyFrequency()
        }

        if(duration == null){
            throw invalidHabitFields.emptyDuration()
        }

        if(restTime == null){
            throw invalidHabitFields.emptyRest()
        }

        const schedule = Schedule.create(frequency, duration, restTime)

        return new habit(id,name, description, schedule, userId)

    }

    static createWithProgess(
        id: string,
        name: string,
        description: string,
        frequency: number, 
        duration: number,
        restTime: number,
        userId: string,
        progress: number = 0,
        creation_date: Date = new Date(),
        update_date: Date = new Date()
    ):habit {
        if(name.length == 0){
            throw invalidHabitFields.emptyName()
        }

        if(frequency == null){
            throw invalidHabitFields.emptyFrequency()
        }

        if(duration == null){
            throw invalidHabitFields.emptyDuration()
        }

        if(restTime == null){
            throw invalidHabitFields.emptyRest()
        }

        if(progress < 0 || progress > 100){
            throw invalidHabitProgress.withProgress(progress)
        }

        const schedule = Schedule.create(frequency, duration, restTime)

        return new habit(id,name, description, schedule, userId, progress)

    }
}