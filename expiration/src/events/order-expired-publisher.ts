import { Publisher } from "../common/publisher";
import { OrderExpiredEvent } from "../common/order-expired-event";
import { Subjects } from "../common/subjects";


export class OrderExpiredPublisher extends Publisher<OrderExpiredEvent> {
    readonly subject: Subjects = Subjects.OrderExpired;
}
