import { PaymentSucceedData, PaymentSucceedEvent } from "../common/payment-succeed-event";
import { Subjects } from "../common/subjects";
import { OrderModel } from "../models/order-model";
import { OrderStatus } from "../common/order-status";
import { orderUpdatedProducer } from "./order-updated-producer";
import { kafkaClient } from "../kafka-wrapper";
import { KConsumer } from "../common/k-consumer";

export class PaymentSucceedConsumer extends KConsumer<PaymentSucceedEvent>{
    readonly subject = Subjects.PaymentSucceed;
    queueGroupName: string = "orders-service-payments";

    async onMessage(data: PaymentSucceedData) {

        try{
            const order = await OrderModel.findById(data.orderId).exec();
            order.set({
                status: OrderStatus.Completed
            })
            await order.save();
            await order.populate("ticket");

            // new OrderUpdatedPublisher(natsWrapper.client).publish({
            //     id: order._id.toString(),
            //     version:order.version,
            //     ticket:{
            //         id: order.ticket._id,
            //         price: order.ticket.price,
            //         title: order.ticket.title
            //     },
            //     status: OrderStatus.Completed
            // });

            orderUpdatedProducer.send({
                id: order._id.toString(),
                version:order.version,
                ticket:{
                    id: order.ticket._id,
                    price: order.ticket.price,
                    title: order.ticket.title
                },
                status: OrderStatus.Completed
            },order._id.toString())
    
        }catch(err){
            console.error(err);
        }
        
    }
}