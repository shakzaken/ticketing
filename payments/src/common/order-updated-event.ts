import { OrderStatus } from "./order-status"
import { Subjects } from "./subjects"

export interface OrderUpdatedData {
    id: string,
    status: OrderStatus,
    version:number
    ticket:{
        id: string,
        title: string,
        price: number
    }
}

export interface OrderUpdatedEvent{
    subject: Subjects,
    data: OrderUpdatedData
}