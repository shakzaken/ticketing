import express  from "express"
import  bodyParser from "body-parser"
import mongoose from 'mongoose'

import cookieSession from "cookie-session";
import { randomBytes } from "crypto";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/order-created-listener";
import { OrderUpdatedListener } from "./events/order-updated-listener";
import { createPaymentRouter } from "./routes/create-payments-route";
import cors from "cors";
import { OrderCreatedConsumer } from "./kafka/order-created-consumer";
import { kafkaClient } from "./kafka-wrapper";
import { OrderUpdatedConsumer } from "./kafka/order-updated-consumer";
import { paymentSucceedProducer } from "./kafka/payment-succeed-producer";



const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    name:"session",
    keys:['key1','key2']
}))
app.use(cors());


app.use(createPaymentRouter);

setup();

app.listen(3004, async () => {
    console.log("Payment application listen on port 3004")
});





async function setup(){

    await mongoose.connect("mongodb://127.0.0.1:27017/payments")
    console.log("connected to mongodb")

    // const connectionId = randomBytes(4).toString('hex');
    // await natsWrapper.connect("ticketing",connectionId,'http://localhost:4222');


    // natsWrapper.client.on('close', ()=> {
    //     console.log("NATS connection closed!");
    //     process.exit();
    // })
    // process.on("SIGINT", () => natsWrapper.client.close());
    // process.on("SIGTERM",() => natsWrapper.client.close());

    // new OrderCreatedListener(natsWrapper.client).listen();
    // new OrderUpdatedListener(natsWrapper.client).listen();

    new OrderCreatedConsumer(kafkaClient).run();
    new OrderUpdatedConsumer(kafkaClient).run();

    paymentSucceedProducer.connect();


}