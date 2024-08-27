import mongoose, { Schema } from "mongoose";


export interface ITicket {
    _id: string;
    title: string;
    price: number;
    version?: number;
}

const ticketSchema = new Schema<ITicket>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export const TicketModel = mongoose.model<ITicket>('Ticket',ticketSchema)