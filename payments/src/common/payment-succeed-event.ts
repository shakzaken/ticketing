import { Subjects } from "./subjects";

export interface PaymentSucceedEvent{
    subject: Subjects,
    data: PaymentSucceedData
}

interface PaymentSucceedData{
    orderId: string,
    paymentId: string
}