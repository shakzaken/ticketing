import express from "express";
import { requireAuth } from "../common/require-auth";
import { UserDto } from "../common/user-dto";
import { ITicket, TicketModel } from "../models/ticket-model";
const router = express.Router();



router.get("/tickets",requireAuth, async (req,res) => {


    try{
        //@ts-ignore
        const user: UserDto = req.currentUser;
        const tickets: ITicket[]  = await TicketModel.find({ userId: user.id  }).exec();
        res.status(200).send(tickets);
    }catch(err){
        res.status(500).send("something wrong happend...")
    }
});

router.get("/tickets/:id", async (req,res) => {
    try{
        //@ts-ignore
        const ticketId = req.params.id;
        const ticket: ITicket|null  = await TicketModel.findById(ticketId).exec()
        
        if(ticket == null){
            res.status(404).send("ticket not found");
        }

        res.status(200).send(ticket);
    }catch(err){
        res.status(500).send("something wrong happend...")
    }
})

export {router as getTicketsRouter}