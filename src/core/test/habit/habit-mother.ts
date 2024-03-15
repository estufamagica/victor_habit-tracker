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
    private progress: number = 0

    build(): habit {
        return habit.createWithProgess(
            this.id,
            this.name,
            this.description,
            this.frequency,
            this.duration,
            this.restTime,
            this.userId,
            this.progress
        )
    }

    withProgress(progress: number){
        this.progress = progress
        return this
    }

    static create(): habit {
        return new habitMother().build()
    }
}