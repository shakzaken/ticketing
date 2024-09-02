
import { randomBytes } from "crypto";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/order-created-listener";


async function setup(){

    const connectionId = randomBytes(4).toString('hex');
    await natsWrapper.connect("ticketing",connectionId,'http://localhost:4222');


    natsWrapper.client.on('close', ()=> {
        console.log("NATS connection closed!");
        process.exit();
    })
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM",() => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();

}

setup();