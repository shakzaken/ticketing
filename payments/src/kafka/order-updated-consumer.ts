import { KConsumer } from "../common/k-consumer";
import { OrderUpdatedData, OrderUpdatedEvent } from "../common/order-updated-event";
import { Subjects } from "../common/subjects";
import { OrderModel } from "../models/order-model";
import { OrderStatus } from "../common/order-status";


export class OrderUpdatedConsumer extends KConsumer<OrderUpdatedEvent> {
    readonly subject = Subjects.OrderUpdated;
    queueGroupName: string = "payments-service-order-updated";

    async onMessage(data: OrderUpdatedData) {

        try{
            const order = await OrderModel.findById(data.id);
            if(order.version !== data.version -1){
                console.error("order version is incorrect");
                return;
            }

            if(order.status == OrderStatus.Cancelled || order.status == OrderStatus.Completed){
                console.log("order is cancelled or completed");
            }
            order.set({
                price: data.ticket.price,
                status: data.status
            });
            await order.save();

        }catch(err){
            console.error(err);
        }
        
    }
}