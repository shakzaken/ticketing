import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { OrderCreatedData, OrderCreatedEvent } from "../common/order-created-event";
import { Subjects } from "../common/subjects";
import { TicketModel } from "../models/ticket-model";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects = Subjects.OrderCreated;
    queueGroupName: string = "ticket-service"

    async onMessage(data: OrderCreatedData, msg: Message): Promise<void> {
        
        const ticket = await TicketModel.findById(data.ticket.id).exec();
        if(ticket == null){
            console.error("OrderCreated event for a ticket that is not found");
            return;
        }
        ticket.set({
            orderId: data.id
        });
        await ticket.save();
        msg.ack();
    }

}