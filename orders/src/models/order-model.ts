import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "../common/order-status";


export interface IOrder {
    ticketId: Schema.Types.ObjectId,
    userId: string,
    expiration: Date,
    status: OrderStatus

}

const orderSchema = new Schema<IOrder>({
    ticketId:{
        type: Schema.Types.ObjectId,
        ref:"Ticket"
    },
    userId:{
        type: String,
        required: true
    },
    expiration:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

export const OrderModel = mongoose.model<IOrder>('Order',orderSchema);