import { habit } from '../../domain/habit/habit'
import { v4 as uuidv4 } from 'uuid'

export class habitMother{
    private id: string = uuidv4()
    private name: string = 'habit'
    private description: string = 'default habit'
    private frequency: number = 3600
    private duration: number = 60
    private restTime: number = 600
    private userId: string = uuidv4()

    build(): habit {
        return habit.create(
            this.id,
            this.name,
            this.description,
            this.frequency,
            this.duration,
            this.restTime,
            this.userId
        )
    }

    static create(): habit {
        return new habitMother().build()
    }
}