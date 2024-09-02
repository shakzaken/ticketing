import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { OrderCreatedData, OrderCreatedEvent } from "../common/order-created-event";
import { Subjects } from "../common/subjects";
import { OrderModel } from "../models/order-model";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {

    subject: Subjects = Subjects.OrderCreated;
    queueGroupName: string = "payment-service";

    async onMessage(data: OrderCreatedData, msg: Message): Promise<void> {
        
        try{
            const order = new OrderModel({
                _id: data.id,
                price: data.ticket.price,
                userId: data.userId,
                status: data.status
            });
            await order.save();
            msg.ack();

        }catch(err){
            console.error(err);
        }
    }
}