import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { TicketCreatedData, TicketCreatedEvent } from "../common/ticket-created-event";
import { Subjects } from "../common/subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName: string = "ticket-service"
    onMessage(data: TicketCreatedData, msg: Message): void {
        console.log("message received")
        msg.ack();
        
    }
}