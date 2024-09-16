import { OrderCancelledData, OrderUpdatedEvent } from "../common/order-cancelled-event";
import { Subjects } from "../common/subjects";
import { KConsumer } from "../common/k-consumer";
import { OrderStatus } from "../common/order-status";
import { TicketModel } from "../models/ticket-model";


export class OrderUpdatedConsumer extends KConsumer<OrderUpdatedEvent>{
    readonly subject = Subjects.OrderUpdated;
    queueGroupName: string = "tickets-service-order-updated";

    async onMessage(data: OrderCancelledData) {
        if(data.status != OrderStatus.Cancelled){
            return;
        }
        
        const ticket = await TicketModel.findOne({
            orderId: data.id
        }).exec();

        if(ticket == null){
            console.error("Cancelled Order don't have a ticket");
            return;
        }

        ticket.set({
            orderId: null
        });
        await ticket.save();
        
    }
}