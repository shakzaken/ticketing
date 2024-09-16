
import { randomBytes } from "crypto";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/order-created-listener";
import { OrderCreatedConsumer } from "./kafka/order-created-consumer";
import { kafkaClient } from "./kafka-wrapper";
import { orderExpiredProducer } from "./kafka/order-expired-producer";


async function setup(){

    // const connectionId = randomBytes(4).toString('hex');
    // await natsWrapper.connect("ticketing",connectionId,'http://localhost:4222');


    // natsWrapper.client.on('close', ()=> {
    //     console.log("NATS connection closed!");
    //     process.exit();
    // })
    // process.on("SIGINT", () => natsWrapper.client.close());
    // process.on("SIGTERM",() => natsWrapper.client.close());

 //   new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCreatedConsumer(kafkaClient).run();

    orderExpiredProducer.connect();

}

setup();