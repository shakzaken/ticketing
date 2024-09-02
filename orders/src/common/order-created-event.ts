import { Subjects } from "./subjects";
import { OrderStatus } from "./order-status";


export interface OrderCreatedData {

    id: string,
    expiration:Date,
    status: OrderStatus,
    userId: string,
    version:number,
    ticket:{
        id: string,
        price: number,
        title: string
    }

}

export interface OrderCreatedEvent{
    subject: Subjects,
    data: OrderCreatedData
}
