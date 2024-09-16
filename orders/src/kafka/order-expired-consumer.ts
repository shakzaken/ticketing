import { OrderExpiredData, OrderExpiredEvent } from "../common/order-expired-event";
import { Subjects } from "../common/subjects";
import { OrderModel } from "../models/order-model";
import { OrderStatus } from "../common/order-status";
import { orderUpdatedProducer } from "./order-updated-producer";
import { kafkaClient } from "../kafka-wrapper";
import { KConsumer } from "../common/k-consumer";

export class OrderExpiredConsumer extends KConsumer<OrderExpiredEvent>{
    readonly subject = Subjects.OrderExpired;
    queueGroupName: string = "orders-service-expiration";

    async onMessage(data: OrderExpiredData) {

        const order =  await OrderModel.findById(data.orderId).exec();
        await order.populate("ticket");
            
        if(order == null){
            console.error(`order ${data.orderId} is not found in DB`);
            return;
        }
        if(order.status == OrderStatus.Completed || order.status == OrderStatus.Cancelled){
            // order is already completed or cancelled.
            return;
        }

        order.set({
            status: OrderStatus.Cancelled
        });
        await order.save()

        // new OrderUpdatedPublisher(natsWrapper.client).publish({
        //     id: order.id,
        //     status: order.status,
        //     version: order.version,
        //     ticket:{
        //         id: order.ticket._id,
        //         title: order.ticket.title,
        //         price: order.ticket.price
        //     }
        // });

        orderUpdatedProducer.send({
            id: order.id,
            status: order.status,
            version: order.version,
            ticket:{
                id: order.ticket._id,
                title: order.ticket.title,
                price: order.ticket.price
            }
        },order.id.toString())

        
    }
}