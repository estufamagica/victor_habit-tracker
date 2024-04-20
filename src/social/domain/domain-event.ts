import { v4 as uuidv4 } from 'uuid'

type Map = {[key:string]: string | number | boolean | null | Date | string[] }

export abstract class domainEvent<Payload extends Map = Map>{
    readonly id: string
    readonly aggregateId: string
    readonly type: string
    readonly payload: Payload
    readonly date: Date
    readonly veresion: number

    protected constructor(
        agregateId: string,
        type: string,
        payload: Payload,
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