import { Schema,model } from "mongoose"


interface IPayment{

    _id: string,
    orderId: string
}

const paymentSchema = new Schema<IPayment>({
    orderId: {
        type: String,
        required: true
    }
})

export const PaymentModel = model<IPayment>("Payment",paymentSchema);
