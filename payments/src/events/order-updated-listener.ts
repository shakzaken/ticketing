import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { OrderUpdatedData, OrderUpdatedEvent } from "../common/order-updated-event";
import { Subjects } from "../common/subjects";
import { OrderModel } from "../models/order-model";
import { OrderStatus } from "../common/order-status";

export class OrderUpdatedListener extends Listener<OrderUpdatedEvent>{
    subject: Subjects = Subjects.OrderUpdated;
    queueGroupName: string = "payment-service";
    async onMessage(data: OrderUpdatedData, msg: Message): Promise<void> {
        
        try{
            const order = await OrderModel.findById(data.id);
            if(order.status == OrderStatus.Cancelled || order.status == OrderStatus.Completed){
                console.log("order is cancelled or completed");
                return msg.ack();
            }
            order.set({
                price: data.ticket.price,
                status: data.status
            });
            await order.save();
            msg.ack();

        }catch(err){
            console.error(err);
        }
        
    }
}