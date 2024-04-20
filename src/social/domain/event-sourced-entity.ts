import { domainEvent } from "./domain-event"

export abstract class EventSourcedEntity {
    private appliedEvents: domainEvent[] = []
    private version: number

    protected constructor(stream?: Array<domainEvent>){
        if(stream){
            stream.forEach(event => {
                this.when(event)
            })
            this.version = stream.length
        }else{
            this.version = 0
        }
    }

    protected apply(event: domainEvent) {
        this.appliedEvents.push(event)
        this.when(event)
    }

    protected abstract when(event: domainEvent): void

    realeseEvents(): domainEvent[]{
        const events = this.appliedEvents
        this.appliedEvents = []
        return events
    }
}