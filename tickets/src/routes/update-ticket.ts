import express from "express";
import { TicketModel } from "../models/ticket-model";
const router = express.Router();




router.put("/tickets", async (req,res) => {

    const {title,price,_id} = req.body;

    try{
        const ticket = await TicketModel.findById(_id).exec();
        if(ticket == null){
            res.status(404).send("ticket not found");
        }
        ticket.set({
            title,price
        });
        await ticket.save()
        res.status(200).send(ticket)
    }catch(err){
        console.error(err);
        res.status(500).send("Something wrong happend")
    }
    
})


export {router as updateTicketRouter}