import express  from "express"
import  bodyParser from "body-parser"
import mongoose from 'mongoose'

import cookieSession from "cookie-session";
import { randomBytes } from "crypto";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/ticket-created-listener";
import { createOrderRouter } from "./routes/create-order-route";
import { OrderExpiredListener } from "./events/order-expired-listener";
import { PaymentSucceedListener } from "./events/payment-succeed-listener";
import cors from "cors";
import { getOrdersRouter } from "./routes/get-orders-route";
import { kafkaClient } from "./kafka-wrapper";
import { TicketCreatedConsumer } from "./kafka/ticket-created-consumer";
import { OrderExpiredConsumer } from "./kafka/order-expired-consumer";
import { PaymentSucceedConsumer } from "./kafka/payment-succeed-consumer";
import { orderCreatedProducer } from "./kafka/order-created-producer";
import { orderUpdatedProducer } from "./kafka/order-updated-producer";




const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    name:"session",
    keys:['key1','key2']
}))
app.use(cors());


setup();

app.listen(3002, async () => {
    console.log("Orders application listen on port 3002")
});

app.use(createOrderRouter);
app.use(getOrdersRouter);




async function setup(){

    await mongoose.connect("mongodb://127.0.0.1:27017/orders")
    console.log("connected to mongodb")



    new TicketCreatedConsumer(kafkaClient).run();
    new OrderExpiredConsumer(kafkaClient).run();
    new PaymentSucceedConsumer(kafkaClient).run();


    orderCreatedProducer.connect();
    orderUpdatedProducer.connect();

    
}