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

    const connectionId = randomBytes(4).toString('hex');
    await natsWrapper.connect("ticketing",connectionId,'http://localhost:4222');


    natsWrapper.client.on('close', ()=> {
        console.log("NATS connection closed!");
        process.exit();
    })
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM",() => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new OrderExpiredListener(natsWrapper.client).listen();
    new PaymentSucceedListener(natsWrapper.client).listen();
}