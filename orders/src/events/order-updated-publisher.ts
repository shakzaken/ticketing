import { OrderUpdatedEvent } from "../common/order-updated-event";
import { Publisher } from "../common/publisher";
import { Subjects } from "../common/subjects";


export class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent>{
    readonly subject: Subjects = Subjects.OrderUpdated;
}