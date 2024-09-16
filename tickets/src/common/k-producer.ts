import {Kafka, Producer} from "kafkajs";
import {Event} from "../common/event";



export abstract class KProducer<T extends Event> {

    abstract subject: T['subject'];
    private kafka: Kafka = null;
    private producer: Producer;

    constructor(kafkaClient: Kafka){

        //@ts-ignore
        this.kafka = kafkaClient;
        this.producer = this.kafka.producer();
        
        
    }

    public async connect(){
        await this.producer.connect();
    }

    public async disconnect(){
        await this.producer.disconnect();
    }



    public async send(data: T['data'],key:string){
        await this.producer.send({
            topic: this.subject.toString(),
            messages:[{
                key:key,
                value: JSON.stringify(data)
            }]
        });
        console.log(`sent message: ${this.subject}`);
    }

}