import { KConsumer } from "../common/k-consumer";
import { OrderCreatedData, OrderCreatedEvent } from "../common/order-created-event";
import { Subjects } from "../common/subjects";
import { expirationQueue } from "../queues/expiration-queue";

export class OrderCreatedConsumer extends KConsumer<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName: string = "expiration-service";

    async onMessage(data: OrderCreatedData) {

        const delay = new Date(data.expiration).getTime() -  Date.now();
        
        await expirationQueue.add({orderId: data.id},{
            delay: delay
        });
    }
}