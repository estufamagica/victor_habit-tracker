import { reminder } from '../../domain/reminder/reminder'
import { v4 as uuidv4 } from 'uuid'

export class reminderMother{
    private id: string = uuidv4()
    private habitId: string = ''
    private message: string = 'Haz los deberes'
    private status: boolean = true
    private hour: number = 19

    build(): reminder{
        return reminder.create(
            this.id,
            this.habitId,
            this.message,
            this.status,
            this.hour
        )
    }

    withId(habitId: string){
        this.habitId = habitId
        return this
    }

    withHour(hour: number){
        this.hour = hour
        return this
    }

    static create(): reminder {
        return new reminderMother().build()
    }
}