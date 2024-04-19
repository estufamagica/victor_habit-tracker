import { challenge } from '../../domain/challenge/challenge'
import { v4 as uuidv4 } from 'uuid'

export class challengeMother{
    private id: string = uuidv4()
    private habitId: string = 'hsbitId'
    private description: string = 'challenge'
    private times: number = 1
    private starDate: Date = new Date()
    private deadLine: Date = new Date()
    private status: string = 'Pendiente'

    build(): challenge {
        return challenge.create(
            this.id,
            this.habitId,
            this.description,
            this.times,
            this.starDate,
            this.deadLine,
            this.status
        )
    }

    withHabitId(id: string){
        this.habitId = id
        return this
    }

    withStatus(status: string){
        this.status = status
        return this
    }

    static create(): challenge {
        return new challengeMother().build()
    }

}