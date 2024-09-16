import { Subjects } from "../common/subjects";
import { TicketCreatedEvent } from "../common/ticket-created-event";
import { KProducer } from "../common/k-producer";
import { kafkaClient } from "../kafka-wrapper";


class TicketCreatedProducer extends KProducer<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
    
}

export const createTicketProducer = new TicketCreatedProducer(kafkaClient);