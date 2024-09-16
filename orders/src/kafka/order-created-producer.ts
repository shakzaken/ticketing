import { OrderCreatedEvent } from "../common/order-created-event";
import { Subjects } from "../common/subjects";
import { KProducer } from "../common/k-producer";
import { kafkaClient } from "../kafka-wrapper";

class OrderCreatedProducer extends KProducer<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}

export const orderCreatedProducer = new OrderCreatedProducer(kafkaClient);