import { Subjects } from "./subjects";


export interface TicketCreatedData {
    id: string,
    title: string,
    userId: string,
    price: number,
    orderId: string
}
export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated,
    data: TicketCreatedData
}