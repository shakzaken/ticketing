import { PaymentSucceedEvent } from "../common/payment-succeed-event";
import { Publisher } from "../common/publisher";
import { Subjects } from "../common/subjects";

export class PaymentSucceedPublisher extends Publisher<PaymentSucceedEvent>{
    subject: Subjects = Subjects.PaymentSucceed
}
