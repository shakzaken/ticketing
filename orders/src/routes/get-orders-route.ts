import express  from "express";
import { OrderModel } from "../models/order-model";
import { UserDto } from "../common/user-dto";
import { requireAuth } from "../common/require-auth";

const router = express.Router();


router.get("/orders", requireAuth,async (req,res) => {


    try{
        //@ts-ignore
        const user: UserDto = req.currentUser;
        const orders = await OrderModel.find({userId:user.id}).populate("ticket");
        res.send(orders);
    }catch(err){
        console.error(err);
        return res.status(500).send("Something wrong happend...")
    }
    
})


router.get("/orders/:id", async (req,res) => {
    try{
        //@ts-ignore
        const orderId = req.params.id;
        const order = await OrderModel.findById(orderId);
        await order.populate("ticket");
        res.send(order);
    }catch(err){
        console.error(err);
        return res.status(500).send("Something wrong happend...")
    }
})

export {router as getOrdersRouter}