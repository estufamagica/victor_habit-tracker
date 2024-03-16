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
    private wearableDeviceId: string = null
    private validation: boolean = false

    build(): habit {
        return habit.create(
            this.id,
            this.name,
            this.description,
            this.frequency,
            this.duration,
            this.restTime,
            this.userId,
            this.progress,
            this.wearableDeviceId,
            this.validation
        )
    }

    withProgress(progress: number){
        this.progress = progress
        return this
    }

    withUserId(UserId: string){
        this.userId = UserId
        return this
    }

    withWearableDevice(wearableDeviceId: string){
        this.wearableDeviceId = wearableDeviceId
        return this
    }

    withValidation(validation: boolean){
        this.validation = validation
        return this
    }

    static create(): habit {
        return new habitMother().build()
    }
}