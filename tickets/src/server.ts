import express  from "express"
import  bodyParser from "body-parser"
import mongoose from 'mongoose'

import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/create-ticket"; 
import { getTicketsRouter } from "./routes/get-tickets";
import { updateTicketRouter } from "./routes/update-ticket";
import { randomBytes } from "crypto";
import { natsWrapper } from "./nats-wrapper";
import { OrderUpdatedListener } from "./events/order-updated-listener";
import { OrderCreatedListener } from "./events/order-created-listener";

import { OrderCreatedConsumer } from "./kafka/order-created-consumter";
import { OrderUpdatedConsumer } from "./kafka/order-updated-consumer";

import cors from "cors";
import { kafkaClient } from "./kafka-wrapper";
import { createTicketProducer } from "./kafka/ticket-created-producer";

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    name:"session",
    keys:['key1','key2']
}))
app.use(cors());

app.use(createTicketRouter)
app.use(getTicketsRouter)
app.use(updateTicketRouter)


setup();

app.listen(3001, async () => {
    console.log("Tickets application listen on port 3001")
});



async function setup(){

    await mongoose.connect("mongodb://127.0.0.1:27017/tickets")
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


    // kafka

    new OrderCreatedConsumer(kafkaClient).run();
    new OrderUpdatedConsumer(kafkaClient).run();

    createTicketProducer.connect();
}