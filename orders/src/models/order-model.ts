import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "../common/order-status";
import { ITicket } from "./ticket-model";


export interface IOrder {
    ticket: ITicket,
    userId: string,
    expiration: Date,
    status: OrderStatus

}

const orderSchema = new Schema<IOrder>({
    ticket:{
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