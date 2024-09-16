import { KProducer } from "../common/k-producer";
import { OrderExpiredEvent } from "../common/order-expired-event";
import { Subjects } from "../common/subjects";
import { kafkaClient } from "../kafka-wrapper";

class OrderExpiredProducer extends KProducer<OrderExpiredEvent>{
    readonly subject = Subjects.OrderExpired;
}


export const orderExpiredProducer = new OrderExpiredProducer(kafkaClient);