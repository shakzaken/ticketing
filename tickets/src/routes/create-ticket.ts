import express from "express";
import { requireAuth } from "../common/require-auth";
import { TicketModel } from "../models/ticket-model";
import { UserDto } from "../common/user-dto";

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
        res.status(201).send(ticket)

    }catch(err){
        res.status(500).send("something went wrong");
    }


});

export {router as createTicketRouter}