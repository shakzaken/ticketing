import { Publisher } from "../common/publisher";
import { Subjects } from "../common/subjects";
import { TicketCreatedEvent } from "../common/ticket-created-event";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}