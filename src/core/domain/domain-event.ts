import { v4 as uuidv4 } from 'uuid'

export abstract class domainEvent{
    readonly id: string
    readonly aggregateId: string
    readonly type: string
    readonly payload
    readonly date: Date
    readonly veresion: number

    protected constructor(
        agregateId: string,
        type: string,
        payload,
        version: number = 1 
    ){
        this.id = uuidv4()
        this.aggregateId = agregateId
        this.type = type
        this.payload = payload
        this.date = new Date()
        this.veresion = version
    }
}