import Queue from "bull" 
import { OrderExpiredPublisher } from "../events/order-expired-publisher";
import { natsWrapper } from "../nats-wrapper";
import { orderExpiredProducer } from "../kafka/order-expired-producer";
import { kafkaClient } from "../kafka-wrapper";


export interface Payload{
    orderId:string
}

export const expirationQueue = new Queue<Payload>(
    "order:expiration",{
        redis:{
            host: "127.0.0.1",
            port:6379
        }
    }
);

expirationQueue.process(async (job) => {

    orderExpiredProducer.send({
        orderId: job.data.orderId
    },job.data.orderId.toString())
  //  new OrderExpiredPublisher(natsWrapper.client).publish({orderId: job.data.orderId});
});