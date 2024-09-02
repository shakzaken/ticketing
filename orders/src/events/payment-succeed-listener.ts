import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { PaymentSucceedEvent,PaymentSucceedData } from "../common/payment-succeed-event";
import { Subjects } from "../common/subjects";
import { OrderModel } from "../models/order-model";
import { OrderStatus } from "../common/order-status";
import { OrderUpdatedPublisher } from "./order-updated-publisher";
import { natsWrapper } from "../nats-wrapper";



export class PaymentSucceedListener extends Listener<PaymentSucceedEvent>{
    subject: Subjects = Subjects.PaymentSucceed;
    queueGroupName: string = "orders-service";
    async onMessage(data: PaymentSucceedData, msg: Message): Promise<void> {
        
        try{
            const order = await OrderModel.findById(data.orderId).exec();
            order.set({
                status: OrderStatus.Completed
            })
            await order.save();
            await order.populate("ticket");

            new OrderUpdatedPublisher(natsWrapper.client).publish({
                id: order._id.toString(),
                version:order.version,
                ticket:{
                    id: order.ticket._id,
                    price: order.ticket.price,
                    title: order.ticket.title
                },
                status: OrderStatus.Completed
            });
            msg.ack();
        }catch(err){
            console.error(err);
        }
    }
}