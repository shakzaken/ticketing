import { Subjects } from "./subjects";
import { OrderStatus } from "./order-status";


export interface OrderCreatedData {

    id: string,
    expiration:Date,
    status: OrderStatus,
    userId: string,
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
