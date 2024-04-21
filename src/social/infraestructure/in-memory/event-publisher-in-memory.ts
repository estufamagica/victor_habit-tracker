import { domainEvent } from "../../domain/domain-event";
import { EventPublisher } from "../../domain/event-publisher";

export class eventPublisheInMemory implements EventPublisher{
    private publishedEvents: domainEvent[] = []
    
    publish(events: domainEvent[]): void{
        events.forEach((event) => {
            this.publishedEvents.push(event)
        })
    }

    isEmpty(): boolean{
        return this.publishedEvents.length === 0
    }

    pop(): domainEvent{
        return this.publishedEvents[-1]
    }
}