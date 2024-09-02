import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { OrderCancelledData, OrderUpdatedEvent } from "../common/order-cancelled-event";
import { Subjects } from "../common/subjects";
import { TicketModel } from "../models/ticket-model";
import { OrderStatus } from "../common/order-status";


export class OrderUpdatedListener extends Listener<OrderUpdatedEvent>{
    readonly subject: Subjects = Subjects.OrderUpdated;
    queueGroupName: string = "order-serivce";

    async onMessage(data: OrderCancelledData, msg: Message): Promise<void> {

        if(data.status != OrderStatus.Cancelled){
            msg.ack();
            return;
        }
        
        const ticket = await TicketModel.findOne({
            orderId: data.id
        }).exec();

        if(ticket == null){
            console.error("Cancelled Order don't have a ticket");
            msg.ack();
            return;
        }

        ticket.set({
            orderId: null
        });
        await ticket.save();

        msg.ack();
        
    }
}