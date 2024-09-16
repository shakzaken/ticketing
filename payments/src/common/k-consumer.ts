import { Consumer, Kafka } from "kafkajs";
import { Event } from "../common/event";



export abstract class KConsumer<T extends Event> {

    abstract subject: T['subject'];
    private kafka: Kafka = null;
    private consumer: Consumer;
    abstract queueGroupName: string

    abstract onMessage(data: T['data']);

    constructor(kafka: Kafka){
        this.kafka = kafka;
        
    }

    

    private async connect(){
        this.consumer = await this.kafka.consumer({groupId: this.queueGroupName})
        await this.consumer.connect();
    }

    public async run(){
        await this.connect();
        console.log(`topic name ${this.subject.toString()}`)
        await this.consumer.subscribe({topic: this.subject.toString()});
        this.consumer.run({
            eachMessage: async ({topic,partition,message}) => {
                console.log(`received message: ${this.subject}`)
                const key = message.key.toString();
                const value = JSON.parse(message.value.toString());
                this.onMessage(value);
                
            }
        })

    }
     
}