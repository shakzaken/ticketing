import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { OrderExpiredData, OrderExpiredEvent } from "../common/order-expired-event";
import { Subjects } from "../common/subjects";
import { OrderModel } from "../models/order-model";
import { OrderStatus } from "../common/order-status";
import { OrderUpdatedPublisher } from "./order-updated-publisher";
import { natsWrapper } from "../nats-wrapper";


export class OrderExpiredListener extends Listener<OrderExpiredEvent>{
    readonly subject: Subjects = Subjects.OrderExpired;
    queueGroupName: string = "order-service";
    async onMessage(data: OrderExpiredData, msg: Message): Promise<void> {
        const order =  await OrderModel.findById(data.orderId).exec();
        await order.populate("ticket");
            
        if(order == null){
            console.error(`order ${data.orderId} is not found in DB`);
            msg.ack();
            return;
        }
        if(order.status == OrderStatus.Completed || order.status == OrderStatus.Cancelled){
            // order is already completed or cancelled.
            msg.ack();
            return;
        }

        order.set({
            status: OrderStatus.Cancelled
        });
        await order.save()

        new OrderUpdatedPublisher(natsWrapper.client).publish({
            id: order.id,
            status: order.status,
            ticket:{
                id: order.ticket._id,
                title: order.ticket.title,
                price: order.ticket.price
            }
        });
        msg.ack();
    }
}