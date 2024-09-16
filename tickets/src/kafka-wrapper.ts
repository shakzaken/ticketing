import { Kafka } from "kafkajs";


export const kafkaClient = new Kafka({
    clientId:"ticketing",
    brokers:["127.0.0.1:9092"]
});