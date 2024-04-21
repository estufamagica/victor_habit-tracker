import { domainEvent } from "./domain-event";

export interface EventPublisher {
    publish(event: domainEvent[]): void
    isEmpty(): boolean
    pop(): domainEvent
}