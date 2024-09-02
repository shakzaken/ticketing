import { Subjects } from "./subjects";

export interface OrderExpiredData {
    orderId:string;
}

export interface OrderExpiredEvent{
    subject: Subjects,
    data: OrderExpiredData
}