import { Subjects } from "../common/subjects";
import { TicketCreatedData, TicketCreatedEvent } from "../common/ticket-created-event";
import { TicketModel } from "../models/ticket-model";
import { KConsumer } from "../common/k-consumer";

export class TicketCreatedConsumer extends KConsumer<TicketCreatedEvent>{

    readonly subject = Subjects.TicketCreated;
    queueGroupName: string = "ticket-service";
    async onMessage(data: TicketCreatedData) {
        const ticket = new TicketModel({
            _id: data.id,
            title: data.title,
            price: data.price,
        })
        await ticket.save();
        
    }
}