import { Stan } from "node-nats-streaming";
import nats from "node-nats-streaming"

class NatsWrapper {
    public client: Stan;


    connect(clusterId:string, clientId:string, url: string) {
        this.client = nats.connect(clusterId,clientId,{url});
        return new Promise<void>((resolve,reject) => {
            this.client.on('connect', () => {
                console.log("Connected to NATS");
                resolve();
            });
            this.client.on('error', (err) => {
                reject(err)
            });
        });
    }
}

const natsWrapper = new NatsWrapper();
export {natsWrapper}