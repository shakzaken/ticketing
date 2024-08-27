import express from "express";
import { requireAuth } from "../common/require-auth";
import { UserDto } from "../common/user-dto";
import { TicketModel } from "../models/ticket-model";
import { OrderModel } from "../models/order-model";
import { OrderStatus } from "../common/order-status";
const router = express.Router();

const expirationTime = 1000 * 60 * 15;

router.post("/orders",requireAuth,async (req,res) => {

    try{
        //@ts-ignore
        const user: UserDto = req.currentUser; 
        const {ticketId} = req.body;

        const ticket = await TicketModel.findById(ticketId);
        if(ticket == null){
            return res.status(400).send("ticketId is invalid");
        }

        const expiration = Date.now() + expirationTime;
        const order =  new OrderModel({
            ticketId: ticketId,
            userId: user.id,
            status: OrderStatus.Created,
            expiration: expiration
        })
        await order.save();
        return res.status(201).send(order);


    }catch(err){
        console.error(err);
        return res.status(500).send("something wrong happend")
    }
});

export {router as createOrderRouter}