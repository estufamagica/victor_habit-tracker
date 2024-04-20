import { domainEvent } from "./domain-event";

export interface EventPublisher {
    publish(event: domainEvent[]): void
}