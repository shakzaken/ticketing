import mongoose from "mongoose";

export interface ITicket { 
    _id:string
    title: string,
    price: number,
    userId: string,
    orderId?: string
}

const {Schema} = mongoose;


const ticketSchema = new Schema<ITicket>({
    title:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    orderId:{
        type: String
    },
    userId:{
        type: String,
        required: true
    }
})

const TicketModel = mongoose.model<ITicket>("Ticket",ticketSchema);
export {
    TicketModel
}