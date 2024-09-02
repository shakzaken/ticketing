import { Subjects } from "./subjects";

export interface PaymentSucceedEvent{
    subject: Subjects,
    data: PaymentSucceedData
}

export interface PaymentSucceedData{
    orderId: string,
    paymentId: string
}