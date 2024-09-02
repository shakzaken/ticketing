import { OrderStatus } from "./order-status"
import { Subjects } from "./subjects"

export interface OrderCancelledData {
    id: string,
    status: OrderStatus
}

export interface OrderCancelledEvent{
    subject: Subjects,
    data: OrderCancelledData
}