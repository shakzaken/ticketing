import Queue from "bull" 
import { OrderExpiredPublisher } from "../events/order-expired-publisher";
import { natsWrapper } from "../nats-wrapper";


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
    new OrderExpiredPublisher(natsWrapper.client).publish({orderId: job.data.orderId});
});