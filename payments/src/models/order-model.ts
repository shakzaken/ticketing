import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "../common/order-status";


interface IOrder{
    
    _id: string;
    status: OrderStatus;
    price: number;
    userId: string;
    version:number;
}


const orderSchema = new Schema<IOrder>({
    
    status: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},{versionKey:"version"})

orderSchema.pre('save', function(next) {
    this.increment();
    return next();
  });

export const OrderModel = mongoose.model("Order",orderSchema);