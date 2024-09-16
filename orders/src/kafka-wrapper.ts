import { Kafka } from "kafkajs";


export const kafkaClient = new Kafka({
    clientId:"ticketing",
    brokers:["localhost:9092"]
});