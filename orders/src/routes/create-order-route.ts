import express from "express";
import { requireAuth } from "../common/require-auth";
import { UserDto } from "../common/user-dto";
import { TicketModel } from "../models/ticket-model";
import { OrderModel } from "../models/order-model";
import { OrderStatus } from "../common/order-status";
import { OrderCreatedPublisher } from "../events/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

const expirationTime = 1000 * 60 * 1;

router.post("/orders",requireAuth,async (req,res) => {

    try{
        //@ts-ignore
        const user: UserDto = req.currentUser; 
        const {ticketId} = req.body;

        const ticket = await TicketModel.findById(ticketId);
        if(ticket == null){
            return res.status(400).send("ticketId is invalid");
        }

        const orderInDB = await OrderModel.findOne({ticket:ticketId}).exec();
        if(orderInDB != null && orderInDB.status != OrderStatus.Cancelled ){
            return res.status(400).send("Ticket Is locked or completed")
        }

        const expiration = Date.now() + expirationTime;
        const order =  new OrderModel({
            ticket: ticketId,
            userId: user.id,
            status: OrderStatus.Created,
            expiration: expiration
        })
        await order.save();

        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order._id.toString(),
            userId: order.userId,
            expiration: order.expiration,
            status: order.status,
            version:order.version,
            ticket:{
                id: ticket._id,
                title: ticket.title,
                price: ticket.price
            }
        })
        return res.status(201).send(order);


    }catch(err){
        console.error(err);
        return res.status(500).send("something wrong happend")
    }
});

export {router as createOrderRouter}