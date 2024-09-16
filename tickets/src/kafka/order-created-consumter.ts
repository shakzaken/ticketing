import { OrderCreatedData, OrderCreatedEvent } from "../common/order-created-event";
import { Subjects } from "../common/subjects";
import { KConsumer } from "../common/k-consumer";
import { TicketModel } from "../models/ticket-model";

export class OrderCreatedConsumer extends KConsumer<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName: string = "tickets-service-order-created";

    async onMessage(data: OrderCreatedData) {
        const ticket = await TicketModel.findById(data.ticket.id).exec();
        if(ticket == null){
            console.error("OrderCreated event for a ticket that is not found");
            return;
        }
        ticket.set({
            orderId: data.id
        });
        await ticket.save();
    }
}