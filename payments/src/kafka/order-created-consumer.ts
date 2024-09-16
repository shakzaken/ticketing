import { KConsumer } from "../common/k-consumer";
import { OrderCreatedData, OrderCreatedEvent } from "../common/order-created-event";
import { Subjects } from "../common/subjects";
import { OrderModel } from "../models/order-model";

export class OrderCreatedConsumer extends KConsumer<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName: string = "payments-service-order-created";

    async onMessage(data: OrderCreatedData) {
        try{
            const order = new OrderModel({
                _id: data.id,
                price: data.ticket.price,
                userId: data.userId,
                status: data.status
            });
            await order.save();

        }catch(err){
            console.error(err);
        }
    }
}