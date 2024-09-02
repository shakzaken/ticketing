import express from "express";
import { requireAuth } from "../common/require-auth";
import { TicketModel } from "../models/ticket-model";
import { UserDto } from "../common/user-dto";
import { TicketCreatedPublisher } from "../events/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();


router.post("/tickets",requireAuth, async (req,res) => {

    try{
        const {title,price} = req.body;
        //@ts-ignore
        const user: UserDto = req.currentUser; 
    
        const ticket = new TicketModel({
            title,
            price,
            userId: user.id,  
        })
        await ticket.save();
        
        new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket._id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            orderId: null
        });
       
        res.status(201).send(ticket)

    }catch(err){
        console.error(err);
        res.status(500).send("something went wrong");
    }


});

export {router as createTicketRouter}