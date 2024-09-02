import { Message } from "node-nats-streaming";
import { Listener } from "../common/listener";
import { OrderCreatedData, OrderCreatedEvent } from "../common/order-created-event";
import { Subjects } from "../common/subjects";
import { expirationQueue } from "../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated
    queueGroupName: string = "expiration-service"

    async onMessage(data: OrderCreatedData, msg: Message): Promise<void> {
        const delay = new Date(data.expiration).getTime() -  Date.now();
        
        await expirationQueue.add({orderId: data.id},{
            delay: delay
        });
        msg.ack();
    }

}