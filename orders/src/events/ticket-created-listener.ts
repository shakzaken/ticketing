import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { TicketCreatedData, TicketCreatedEvent } from "../common/ticket-created-event";
import { Subjects } from "../common/subjects";
import { TicketModel } from "../models/ticket-model";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName: string = "ticket-service"
    async onMessage(data: TicketCreatedData, msg: Message): Promise<void> {
        
        const expirationTime = 1000 * 60 * 15;
        const expiration = Date.now() + expirationTime;
        const ticket = new TicketModel({
            _id: data.id,
            title: data.title,
            price: data.price,
            expiration: expiration
        })
        await ticket.save();

        msg.ack();
        
    }
}