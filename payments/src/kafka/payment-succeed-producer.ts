import { KProducer } from "../common/k-producer";
import { PaymentSucceedEvent } from "../common/payment-succeed-event";
import { Subjects } from "../common/subjects";
import { kafkaClient } from "../kafka-wrapper";

class PaymentSucceedProducer extends KProducer<PaymentSucceedEvent>{
    readonly subject = Subjects.PaymentSucceed;
}

export const paymentSucceedProducer = new PaymentSucceedProducer(kafkaClient);