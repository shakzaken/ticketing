import { OrderUpdatedEvent } from "../common/order-updated-event";
import { Subjects } from "../common/subjects";
import { KProducer } from "../common/k-producer";
import { kafkaClient } from "../kafka-wrapper";

class OrderUpdatedProducer extends KProducer<OrderUpdatedEvent> {
    readonly subject = Subjects.OrderUpdated;
}

export const orderUpdatedProducer  = new OrderUpdatedProducer(kafkaClient);