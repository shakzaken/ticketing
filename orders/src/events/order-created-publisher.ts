import { OrderCreatedEvent } from "../common/order-created-event";
import { Publisher } from "../common/publisher";
import { Subjects } from "../common/subjects";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}